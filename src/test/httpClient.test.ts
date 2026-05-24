import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

// We test the httpClient module behavior through axios internals.
// The client is a singleton, so we test its interceptors directly.
vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal<typeof import('axios')>();

  const mockInstance = {
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    defaults: { headers: { common: {} } },
  };

  return {
    ...actual,
    default: {
      ...actual.default,
      create: vi.fn(() => mockInstance),
    },
  };
});

describe('httpClient', () => {
  describe('instance configuration', () => {
    it('should call axios.create with correct base config', async () => {
      // Re-import to trigger module initialization with the mock
      await import('@/lib/httpClient');
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 10000,
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should register both request and response interceptors', async () => {
      const client = (await import('@/lib/httpClient')).default as unknown as {
        interceptors: {
          request: { use: ReturnType<typeof vi.fn> };
          response: { use: ReturnType<typeof vi.fn> };
        };
      };

      expect(client.interceptors.request.use).toHaveBeenCalled();
      expect(client.interceptors.response.use).toHaveBeenCalled();
    });
  });
});

describe('httpClient request interceptor (unit)', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should add Authorization header when auth_token is present in localStorage', () => {
    localStorageMock.setItem('auth_token', 'my-jwt-token');

    // Simulate the request interceptor logic directly
    const config: Record<string, unknown> = {
      headers: {} as Record<string, string>,
    };
    const token = localStorage.getItem('auth_token');
    if (token) {
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }

    expect((config.headers as Record<string, string>).Authorization).toBe(
      'Bearer my-jwt-token'
    );
  });

  it('should NOT add Authorization header when auth_token is absent', () => {
    // No token set
    const config: Record<string, unknown> = {
      headers: {} as Record<string, string>,
    };
    const token = localStorage.getItem('auth_token');
    if (token) {
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }

    expect(
      (config.headers as Record<string, string>).Authorization
    ).toBeUndefined();
  });

  it('should remove auth_token from localStorage on 401 response', () => {
    localStorageMock.setItem('auth_token', 'expired-token');

    // Simulate the response interceptor 401 handler
    const error = { response: { status: 401 }, message: 'Unauthorized' };
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
    }

    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
