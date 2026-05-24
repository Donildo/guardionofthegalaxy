# Guardian of the Galaxy - Frontend

A modern, production-ready React + TypeScript + Vite frontend application with comprehensive tooling, linting, testing, and Docker support.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (v24.12.0 recommended)
- Yarn package manager
- Docker & Docker Compose (optional)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd guardionofthegalaxy

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit `http://localhost:5173` to see your app running.

## 📦 Available Scripts

### Development
```bash
yarn dev        # Start development server
yarn preview    # Preview production build
```

### Building
```bash
yarn build      # Build for production
```

### Code Quality
```bash
yarn lint            # Run ESLint
yarn lint:fix        # Fix ESLint issues
yarn format          # Format code with Prettier
yarn format:check    # Check if code is formatted
```

### Testing
```bash
yarn test            # Run tests in watch mode
yarn test:ui         # Run tests with UI dashboard
yarn test:coverage   # Generate coverage report
```

## 🐳 Docker

### Development with Docker
```bash
docker-compose up -d
```

### Production with Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

See [DOCKER.md](./DOCKER.md) for detailed Docker instructions.

## 📂 Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components (route-based)
├── services/       # API services and integrations
├── hooks/          # Custom React hooks
├── shared/         # Constants and types
├── utils/          # Utility functions
├── lib/            # Library configurations
├── assets/         # Static assets
├── test/           # Test setup and examples
├── App.tsx         # Main component
└── main.tsx        # Entry point
```

See [PROJECT_STRUCTURE.md](./src/PROJECT_STRUCTURE.md) for detailed structure documentation.

## 🛠️ Tech Stack

- **React** 19.2.5 - UI library
- **TypeScript** 6.0.2 - Type safety
- **Vite** 8.0.10 - Fast bundler
- **TailwindCSS** 4.2.4 - Utility-first CSS
- **Vitest** 4.1.5 - Unit testing framework
- **Testing Library** - React testing utilities
- **Axios** - HTTP client
- **ESLint** 10.2.1 - Code linting
- **Prettier** 3.8.3 - Code formatting
- **Husky** 9.1.7 - Git hooks
- **lint-staged** 16.4.0 - Staged lint runner

## ✅ Quality Assurance

### Pre-commit Hooks
- Automatic linting with ESLint
- Code formatting with Prettier
- Runs on staged files only

### Code Standards
- TypeScript strict mode
- ESLint with React & TypeScript rules
- Prettier auto-formatting
- 80 character line width

### Testing
- Unit tests with Vitest
- Component testing with Testing Library
- Coverage reports
- Example test setup included

## 🌐 API Integration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Guardian of the Galaxy
VITE_APP_ENV=development
```

### Health Check Service

```typescript
import healthCheckService from '@/services/healthCheckService';

// Check health
const health = await healthCheckService.checkHealth();

// Poll health status
const stopPolling = healthCheckService.pollHealth(
  30000, // interval
  (status) => console.log('Status changed:', status)
);

// Stop polling
stopPolling();
```

## 📋 Features

- ✅ Hot Module Replacement (HMR)
- ✅ TypeScript support out of the box
- ✅ TailwindCSS for styling
- ✅ Comprehensive testing setup
- ✅ Pre-commit hooks with linting
- ✅ Docker support for dev and prod
- ✅ Environment variable management
- ✅ HTTP client with interceptors
- ✅ Health check monitoring
- ✅ Organized project structure

## 🚨 Troubleshooting

### Port 5173 already in use
```bash
# On macOS/Linux
lsof -i :5173
kill -9 <PID>

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Dependencies not installing
```bash
# Clear cache and reinstall
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

### Tests not running
```bash
# Ensure vitest config is correct
yarn test --reporter=verbose
```

## 📚 Documentation

- [Project Structure](./src/PROJECT_STRUCTURE.md)
- [Docker Setup](./DOCKER.md)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Ensure code passes linting and tests
4. Submit a pull request

Pre-commit hooks will automatically:
- Lint and fix JavaScript/TypeScript files
- Format code with Prettier
- Prevent commits with linting errors

## 📄 License

MIT

## 👥 Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ for the Galaxy
