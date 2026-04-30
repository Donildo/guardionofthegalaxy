import { describe, it, expect } from 'vitest';

describe('Setup Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have a test environment configured', () => {
    expect(typeof document).not.toBe('undefined');
  });
});
