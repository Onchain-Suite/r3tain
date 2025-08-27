# Development Guide

## 🛠️ Production-Grade Development Setup

This project is configured with a comprehensive, production-ready development environment that
ensures code quality, consistency, and follows modern best practices.

## 🏗️ Tools & Configuration

### **Code Quality & Formatting**

- **ESLint** - Comprehensive linting with TypeScript, React, accessibility, and import rules
- **Prettier** - Opinionated code formatting
- **TypeScript** - Static type checking
- **Import Sorting** - Automatic import organization

### **Git Workflow**

- **Husky** - Git hooks automation
- **lint-staged** - Run linters on staged files
- **Commitizen** - Interactive conventional commits
- **Commitlint** - Commit message validation

### **VSCode Integration**

- Workspace settings for optimal development experience
- Extension recommendations
- Auto-formatting on save
- IntelliSense enhancements

## 📝 Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun lint             # Run ESLint (strict, no warnings allowed)
bun lint:fix         # Fix ESLint issues automatically
bun prettier         # Check Prettier formatting
bun prettier:fix     # Fix Prettier formatting
bun type-check       # Run TypeScript type checking
bun format           # Format code and fix lint issues

# Git & Commits
bun commit           # Interactive commit with Commitizen
bun pre-commit       # Run pre-commit checks manually
bun validate         # Run all checks (type-check, lint, prettier)
```

## 🔧 Development Workflow

### **Making Changes**

1. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Code is automatically formatted on save (VSCode)
   - ESLint provides real-time feedback
   - TypeScript checks types in real-time

3. **Commit your changes**

   ```bash
   # Interactive commit (recommended)
   bun run commit

   # Or manual conventional commit
   git commit -m "feat: add new feature"
   ```

4. **Pre-commit hooks automatically:**
   - Format code with Prettier
   - Fix ESLint issues
   - Validate commit message format
   - Block commit if there are errors

### **Commit Message Format**

We use [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Reverting changes

**Examples:**

```bash
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
refactor: optimize database queries
```

## 🎯 Code Quality Rules

### **ESLint Configuration**

Our ESLint setup enforces:

- **TypeScript Best Practices**
  - Consistent type imports
  - Nullish coalescing over logical OR
  - No explicit `any` types
  - Proper async/await usage

- **React Best Practices**
  - No array index keys
  - Proper hook usage
  - Component naming conventions
  - JSX accessibility

- **Import Organization**
  - Automatic import sorting
  - No duplicate imports
  - Unused import removal
  - Consistent import styles

- **Code Quality**
  - No console logs (warnings)
  - Proper error handling
  - Performance optimizations
  - Security best practices

### **Prettier Configuration**

- **2 spaces** for indentation
- **Double quotes** for strings and JSX
- **Semicolons** required
- **80 character** line limit
- **Trailing commas** for ES5
- **Unix line endings** (LF)

## 🔍 Troubleshooting

### **Common Issues**

1. **Commit blocked by lint errors**

   ```bash
   # Fix automatically fixable issues
   bun run lint:fix

   # Check remaining issues
   bun run lint

   # Fix manually and try committing again
   ```

2. **TypeScript errors**

   ```bash
   # Check TypeScript errors
   bun run type-check

   # Fix the reported type errors
   ```

3. **Prettier formatting issues**

   ```bash
   # Fix formatting
   bun run prettier:fix
   ```

4. **VSCode not auto-formatting**
   - Install recommended extensions
   - Reload VSCode window
   - Check that Prettier is set as default formatter

### **Bypassing Hooks (Not Recommended)**

In emergency situations only:

```bash
# Skip pre-commit hooks (NOT RECOMMENDED)
git commit --no-verify -m "emergency fix"

# Skip commit message validation (NOT RECOMMENDED)
git commit --no-verify -m "WIP: work in progress"
```

## 📁 File Structure

```
.
├── .husky/                 # Git hooks
│   ├── commit-msg         # Commit message validation
│   └── pre-commit         # Pre-commit linting
├── .vscode/               # VSCode configuration
│   ├── settings.json      # Workspace settings
│   └── extensions.json    # Recommended extensions
├── src/                   # Source code
├── .commitlintrc.json     # Commit message rules
├── .eslintrc.config.mjs   # ESLint configuration
├── .lintstagedrc.json     # lint-staged configuration
├── .prettierrc.json       # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Best Practices

### **Code Organization**

- Use absolute imports with `@/` path mapping
- Keep components small and focused
- Extract custom hooks for reusable logic
- Use TypeScript interfaces for prop types

### **Git Workflow**

- Create feature branches from `main`
- Use descriptive commit messages
- Keep commits atomic and focused
- Test before pushing

### **Performance**

- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size with code splitting
- Monitor Core Web Vitals

### **Accessibility**

- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper color contrast

## 🎨 VSCode Setup

### **Required Extensions**

- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features

### **Recommended Extensions**

- Tailwind CSS IntelliSense
- Auto Rename Tag
- GitLens
- Path Intellisense
- Error Lens

### **Settings**

The `.vscode/settings.json` file includes optimal settings for:

- Auto-formatting on save
- ESLint integration
- TypeScript enhancements
- File nesting
- IntelliSense improvements

## 📚 Additional Resources

- [ESLint Rules Documentation](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Conventional Commits](https://conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Happy coding! 🎉**

This setup ensures your code is always production-ready, maintainable, and follows industry best
practices.
