# Project Structure

## 📁 Directories

```
src/
├── components/          # Reusable React components
│   └── .gitkeep
├── pages/               # Page components (route-based)
│   └── .gitkeep
├── services/            # API services and external integrations
│   └── .gitkeep
├── hooks/               # Custom React hooks
│   └── .gitkeep
├── shared/              # Shared utilities and types
│   ├── constants/       # Application constants
│   │   └── index.ts
│   └── types/           # TypeScript types and interfaces
│       └── index.ts
├── utils/               # Utility functions
│   └── .gitkeep
├── lib/                 # Third-party library configurations
│   └── .gitkeep
├── assets/              # Static assets (images, fonts, etc.)
│   └── .gitkeep
├── test/                # Test utilities and setup
│   ├── setup.ts
│   └── example.test.ts
├── App.tsx              # Main App component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 📝 Guidelines

### Components (`/components`)
- Create reusable, presentational components
- Use TypeScript for type safety
- One component per file when possible
- Example: `Button.tsx`, `Card.tsx`, etc.

### Pages (`/pages`)
- Create page-level components that map to routes
- Usually contain multiple components
- Example: `HomePage.tsx`, `NotFoundPage.tsx`, etc.

### Services (`/services`)
- API calls and external integrations
- Business logic that can be reused
- Example: `authService.ts`, `userService.ts`, etc.

### Hooks (`/hooks`)
- Custom React hooks
- Reusable logic across components
- Example: `useAuth.ts`, `useFetch.ts`, etc.

### Shared
- **Constants**: App-wide constants and configuration
- **Types**: Shared TypeScript interfaces and types

### Utils (`/utils`)
- Pure utility functions
- Helper functions for common tasks
- Example: `formatDate.ts`, `validate.ts`, etc.

### Lib (`/lib`)
- Configuration for third-party libraries
- Example: `axios.ts` (HTTP client setup), etc.

### Assets (`/assets`)
- Images, icons, fonts, etc.
- Organize by type: `/images`, `/icons`, `/fonts`

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start development server**:
   ```bash
   yarn dev
   ```

3. **Run linting**:
   ```bash
   yarn lint
   yarn lint:fix
   ```

4. **Format code**:
   ```bash
   yarn format
   yarn format:check
   ```

5. **Run tests**:
   ```bash
   yarn test
   yarn test:ui
   yarn test:coverage
   ```

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast bundler
- **TailwindCSS** - Utility-first CSS
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **ESLint + Prettier** - Code quality
- **Husky + lint-staged** - Git hooks
