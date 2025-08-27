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

## 📁 File Structure & Architecture

### **Features-Based Architecture**

R3tain uses a **feature-based architecture** that organizes code by business functionality rather
than technical layers. This approach provides:

- **Better Scalability**: Each feature is self-contained with its own components, hooks, and
  utilities
- **Improved Developer Experience**: Easy to locate and modify feature-specific code
- **Clear Boundaries**: Reduced coupling between different features
- **Team Collaboration**: Multiple developers can work on different features simultaneously

### **Directory Structure**

```
r3tain/
├── .husky/                      # Git hooks
│   ├── commit-msg             # Commit message validation
│   └── pre-commit             # Pre-commit linting
├── .vscode/                     # VSCode configuration
│   ├── settings.json          # Workspace settings
│   └── extensions.json        # Recommended extensions
├── prisma/                      # Database layer
│   └── schema.prisma           # Database schema definition
├── src/                         # Application source code
│   ├── app/                    # Next.js App Router (📄 Routing Layer)
│   │   ├── (root)/            # 🔒 Protected dashboard routes
│   │   │   ├── dashboard/     # Main dashboard page
│   │   │   ├── campaigns/     # Campaign management
│   │   │   ├── automation/    # Email automation
│   │   │   ├── community/     # Subscriber management
│   │   │   └── analytics/     # Performance analytics
│   │   ├── api/               # 🌐 API endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── projects/     # Project management API
│   │   │   └── user/         # User operations API
│   │   ├── auth/              # 🔑 Authentication pages
│   │   └── onboarding/        # 🎆 User onboarding
│   │
│   ├── features/ (🏁 Business Logic Layer)
│   │   ├── auth/              # Authentication & user management
│   │   │   ├── components/    # Auth-specific UI components
│   │   │   ├── pages/         # Auth page components
│   │   │   └── validation/    # Auth form validation schemas
│   │   │
│   │   ├── campaign/          # Email campaign management
│   │   │   └── components/    # Campaign tables, forms, etc.
│   │   │
│   │   ├── automation/        # Email automation workflows
│   │   │   ├── components/    # Automation UI components
│   │   │   ├── flows/         # Automation flow management
│   │   │   └── flow-templates/ # Pre-built templates
│   │   │
│   │   ├── community/         # Subscriber & community management
│   │   │   ├── components/    # Subscriber tables, import wizards
│   │   │   ├── context/       # Import context providers
│   │   │   ├── hooks/         # Community-specific hooks
│   │   │   ├── services/      # Import & validation services
│   │   │   └── types/         # Community type definitions
│   │   │
│   │   ├── analytics/         # Performance analytics
│   │   │   ├── components/    # Charts, reports, dashboards
│   │   │   ├── hooks/         # Analytics data hooks
│   │   │   └── utils/         # Chart data generators
│   │   │
│   │   └── onboarding-flow/   # User onboarding experience
│   │       ├── components/    # Onboarding steps, plan selection
│   │       └── hooks/         # Onboarding state management
│   │
│   ├── shared/ (🔄 Shared Layer)
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base components (Button, Input, etc.)
│   │   │   ├── layout/       # Layout components (Sidebar, Header)
│   │   │   ├── data-table/   # Advanced table components
│   │   │   ├── form-fields/  # Form input components
│   │   │   ├── common/       # Common utilities (Logo, Theme toggle)
│   │   │   └── loading/      # Loading states and skeletons
│   │   │
│   │   ├── hooks/            # Shared custom hooks
│   │   ├── lib/              # Utility functions & configurations
│   │   │   ├── prisma.ts      # Database client setup
│   │   │   ├── utils.ts       # Common utility functions
│   │   │   └── stack.ts       # Stack Auth configuration
│   │   │
│   │   └── providers/        # Context providers
│   │       ├── theme-provider.tsx   # Theme context
│   │       ├── stack-provider.tsx   # Auth context
│   │       └── root-providers.tsx   # Combined providers
│   │
│   ├── config/                 # Application configuration
│   │   ├── dashboard-nav.ts   # Navigation structure
│   │   └── routes.ts          # Route definitions
│   │
│   ├── data/                   # Static data & constants
│   │   ├── campaign.ts        # Campaign-related constants
│   │   └── notifications.ts   # Notification templates
│   │
│   ├── types/                  # Global TypeScript definitions
│   │   ├── auth.ts            # Authentication types
│   │   ├── campaign.ts        # Campaign types
│   │   └── ui.ts              # UI component types
│   │
│   └── styles/                 # Global styles
│       └── globals.css        # Global CSS & Tailwind imports
│
└── Configuration Files
    ├── .commitlintrc.json     # Commit message rules
    ├── eslint.config.mjs      # ESLint configuration
    ├── .lintstagedrc.json     # lint-staged configuration
    ├── .prettierrc.json       # Prettier configuration
    ├── next.config.ts         # Next.js configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    └── tsconfig.json          # TypeScript configuration
```

### **Architecture Layers Explained**

#### **📄 Routing Layer (`src/app/`)**

- **Next.js App Router** with file-based routing
- **Route Groups**: `(root)` for protected dashboard routes
- **API Routes**: RESTful endpoints in `api/` directory
- **Page Components**: Minimal, focused on routing logic

#### **🏁 Business Logic Layer (`src/features/`)**

- **Feature Modules**: Each feature is self-contained
- **Components**: Feature-specific UI components
- **Hooks**: Custom hooks for feature state management
- **Services**: Business logic and API calls
- **Types**: Feature-specific type definitions

#### **🔄 Shared Layer (`src/shared/`)**

- **UI Components**: Reusable design system components
- **Hooks**: Common custom hooks used across features
- **Utilities**: Helper functions and configurations
- **Providers**: Global context providers

### **Feature Module Structure**

Each feature follows a consistent internal structure:

```
feature-name/
├── components/     # Feature-specific UI components
├── hooks/          # Custom hooks for this feature
├── services/       # API calls and business logic
├── types/          # TypeScript types
├── utils/          # Feature-specific utilities
├── context/        # Feature context providers (if needed)
└── index.ts        # Public API exports
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

## 🗄️ Database & Prisma Development

### **Prisma Workflow**

R3tain uses [Prisma](https://www.prisma.io/) as the database ORM with PostgreSQL. Here's the
essential workflow for database development:

### **Essential Prisma Commands**

```bash
# Client Generation (Required after schema changes)
bun prisma generate          # Generate Prisma client
bun prisma generate --watch  # Auto-regenerate on schema changes

# Database Migrations
bun prisma migrate dev       # Create and apply new migration
bun prisma migrate dev --name "description"  # Named migration
bun prisma migrate deploy    # Apply migrations in production
bun prisma migrate reset     # Reset database (⚠️ DESTRUCTIVE)

# Database Management
bun prisma db push          # Push schema changes without migration
bun prisma db seed          # Run database seeding scripts
bun prisma studio           # Open Prisma Studio (GUI)

# Schema Management
bun prisma db pull          # Introspect database to update schema
bun prisma format           # Format schema.prisma file
bun prisma validate         # Validate schema syntax
```

### **Development Workflow**

1. **Making Schema Changes**

   ```bash
   # 1. Edit prisma/schema.prisma
   # 2. Generate client (required for TypeScript types)
   bun prisma generate

   # 3. Create and apply migration
   bun prisma migrate dev --name "add-user-table"
   ```

2. **After Pulling Changes**

   ```bash
   # Always regenerate client after pulling schema changes
   bun prisma generate

   # Apply any new migrations
   bun prisma migrate dev
   ```

3. **Database Reset (Development Only)**

   ```bash
   # Reset database and apply all migrations
   bun prisma migrate reset

   # Alternative: reset and seed
   bun prisma migrate reset --seed
   ```

### **Important Notes**

- **Always run `bun prisma generate`** after any schema changes
- **Client generation is required** for TypeScript types to be updated
- **Migrations are automatically applied** in development with `migrate dev`
- **Never edit migration files manually** - they're auto-generated
- **Use descriptive migration names** for better tracking

### **Database Connection**

The database connection is configured via environment variables:

```bash
# .env.local or .env
DATABASE_URL="postgresql://user:password@localhost:5432/r3tain"
# For Neon DB (recommended for development)
DATABASE_URL="postgresql://user:password@host.neon.tech/r3tain"
```

### **Prisma Studio**

Prisma Studio provides a GUI for your database:

```bash
# Start Prisma Studio
bun prisma studio
# Opens at http://localhost:5555
```

Use it to:

- Browse and edit data
- Test queries
- Understand relationships
- Debug data issues

### **Schema Best Practices**

- **Use descriptive field names**: `createdAt`, `updatedAt`
- **Follow naming conventions**: PascalCase for models, camelCase for fields
- **Add database comments**: Use `/// @description` for documentation
- **Use appropriate indexes**: Add `@@index` for frequently queried fields
- **Set up relations properly**: Define foreign keys and relation names

### **Common Issues & Solutions**

1. **"Prisma Client not found" error**

   ```bash
   # Solution: Generate the client
   bun prisma generate
   ```

2. **TypeScript errors after schema changes**

   ```bash
   # Solution: Regenerate client and restart TypeScript
   bun prisma generate
   # Restart your IDE's TypeScript service
   ```

3. **Migration conflicts**

   ```bash
   # Solution: Reset and reapply (development only)
   bun prisma migrate reset
   ```

4. **Database connection issues**
   ```bash
   # Check connection
   bun prisma db pull
   # Verify DATABASE_URL in environment
   ```

### **Production Considerations**

- Use `prisma migrate deploy` in production, never `migrate dev`
- Always backup before migrations in production
- Test migrations on a staging environment first
- Monitor query performance with database tools

## 📚 Additional Resources

- [ESLint Rules Documentation](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Conventional Commits](https://conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Happy coding! 🎉**

This setup ensures your code is always production-ready, maintainable, and follows industry best
practices.
