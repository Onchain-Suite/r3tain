# R3tain

**Email Marketing Tool for Web3 Brands - Part of the Onchain Suite**

R3tain is a sophisticated email marketing platform specifically designed to enhance user retention
for Web3 brands through personalized, behavior-triggered communication. Unlike traditional email
marketing tools, R3tain is deeply integrated with blockchain analytics, enabling uniquely targeted
campaigns informed by real-time on-chain and off-chain user actions.

## 🎯 Core Functionalities

### **Advanced Email Marketing Activities**

- **Advanced Personalization**: Email segmentation based on user activities both off-chain and
  on-chain, wallet transactions, and behavioral patterns
- **Behavioral Automation**: Real-time triggered emails based on precise on-chain events, such as
  liquidity changes, NFT transactions, or subscription activity
- **Integrated Analytics**: Real-time performance analytics directly integrated into Pulse,
  providing marketers instant feedback on campaign effectiveness

### **Web3 Integration**

- **Blockchain Analytics**: Deep integration with blockchain data for comprehensive user behavior
  tracking
- **On-Chain Event Triggers**: Automated campaigns triggered by specific blockchain activities
- **Wallet-Based Segmentation**: User categorization based on wallet behavior and transaction
  history
- **Cross-Chain Support**: Monitor and respond to activities across multiple blockchain networks

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and Bun runtime
- PostgreSQL database (or Neon DB for cloud setup)
- Environment variables configured (see `.env.example`)

### **Development Setup**

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd r3tain
   bun install
   ```

2. **Set up your database**

   ```bash
   # Generate Prisma client
   bun prisma generate

   # Run database migrations
   bun prisma migrate dev
   ```

3. **Start the development server**

   ```bash
   bun dev
   ```

4. **Open your browser** Navigate to [http://localhost:3000](http://localhost:3000) to see the
   application.

### **Quick Commands**

```bash
# Development
bun dev              # Start development server with Turbopack
bun build            # Build for production
bun start            # Start production server

# Database & Prisma
bun prisma generate  # Generate Prisma client after schema changes
bun prisma studio    # Open Prisma Studio (database GUI)
bun prisma migrate dev # Apply database migrations

# Code Quality
bun run format       # Format code and fix linting issues
bun run validate     # Run all quality checks
bun run commit       # Interactive commit with conventional format
```

## 📁 Project Structure

```
r3tain/
├── .husky/                      # Git hooks configuration
├── .vscode/                     # VSCode settings and extensions
├── prisma/                      # Database schema and migrations
│   └── schema.prisma           # Prisma database schema
├── public/                      # Static assets (SVGs, icons)
├── src/                         # Source code
│   ├── app/                    # Next.js App Router (pages & API routes)
│   │   ├── (root)/            # Protected dashboard routes
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── campaigns/     # Email campaigns management
│   │   │   ├── automation/    # Automation flows & templates
│   │   │   ├── community/     # Subscriber management
│   │   │   ├── analytics/     # Performance analytics
│   │   │   └── profile/       # User profile settings
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── projects/     # Project management
│   │   │   └── user/         # User operations
│   │   ├── auth/              # Authentication pages
│   │   └── onboarding/        # User onboarding flow
│   ├── features/               # Feature-based modules
│   │   ├── auth/              # Authentication feature
│   │   ├── campaign/          # Email campaign management
│   │   ├── automation/        # Email automation workflows
│   │   ├── community/         # Subscriber & community management
│   │   ├── analytics/         # Performance analytics
│   │   ├── onboarding-flow/   # User onboarding
│   │   └── dashboard/         # Dashboard components
│   ├── shared/                 # Shared utilities & components
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base UI components (buttons, forms, etc.)
│   │   │   ├── layout/       # Layout components (sidebar, header)
│   │   │   ├── data-table/   # Table components for data display
│   │   │   └── form-fields/  # Form input components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions & configurations
│   │   └── providers/        # Context providers (theme, auth, etc.)
│   ├── config/                 # App configuration files
│   ├── data/                   # Static data and constants
│   ├── types/                  # TypeScript type definitions
│   └── styles/                 # Global CSS styles
└── Configuration Files
    ├── package.json           # Dependencies and scripts
    ├── next.config.ts         # Next.js configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    ├── tsconfig.json          # TypeScript configuration
    ├── eslint.config.mjs      # ESLint rules
    └── .env.example           # Environment variables template
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Bun for fast development and builds
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with Shadcn UI components
- **Authentication**: Stack Auth for secure user management
- **State Management**: TanStack Query for server state
- **Language**: TypeScript for type safety

## 📖 Documentation

- **[Development Guide](./DEVELOPMENT.md)** - Comprehensive development workflow and best practices
- **[Setup Summary](./DEV_SETUP_SUMMARY.md)** - Quick reference for development commands
- **[API Documentation](./docs/api)** - API endpoints and usage (coming soon)

## 🤝 Contributing

We use a production-grade development workflow with automated code quality checks:

1. **Fork and clone** the repository
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Commit using conventional format**: `bun run commit`
5. **Submit a pull request** with a clear description

All commits must pass our quality gates including ESLint, Prettier, and TypeScript checks.

## 🔗 Related Projects

R3tain is part of the **Onchain Suite** - a comprehensive toolkit for Web3 brands:

- **Pulse** - Analytics dashboard for real-time insights
- **R3tain** - Email marketing with blockchain integration (this project)
- **[Additional tools]** - Coming soon

---

**Built with ❤️ for the Web3 ecosystem**

For questions, support, or contributions, please refer to our documentation or open an issue.
