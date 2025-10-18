# Folder Structure

## Project Root

```
qt-takehome-assignment/
├── backend/           # Backend API server
├── frontend/          # Frontend React application
├── docs/              # Documentation
├── package.json       # Monorepo scripts
└── README.md          # Main readme
```

## Backend Structure

```
backend/
├── src/
│   ├── domain/              # Business logic layer
│   │   ├── entities/        # User entity
│   │   ├── enums/           # UserRole, UserStatus
│   │   ├── value-objects/   # Email validation
│   │   └── services/        # ICryptoService, IProtobufService interfaces
│   │
│   ├── application/         # Use cases layer
│   │   ├── repositories/    # IUserRepository interface
│   │   └── usecases/
│   │       ├── commands/    # Write operations (Create, Update, Delete)
│   │       └── queries/     # Read operations (GetAll, GetById, Stats, Export, PublicKey)
│   │
│   ├── infrastructure/      # Technical implementations
│   │   ├── database/        # SQLite configuration
│   │   ├── repositories/    # UserRepository implementation
│   │   ├── crypto/          # ECDSA cryptography service
│   │   ├── protobuf/        # Protocol Buffer service + schemas
│   │   └── dependencies/    # IoC Container
│   │
│   ├── presentation/        # API layer
│   │   └── routes/          # Express route definitions
│   │
│   ├── shared/              # Cross-cutting concerns
│   │   ├── constants/       # Error messages
│   │   └── utils/           # Helper functions
│   │
│   └── server.ts            # Application entry point
│
├── tests/                   # Test suites
│   ├── unit/                # Unit tests for handlers
│   ├── integration/         # Integration tests
│   └── e2e/                 # End-to-end API tests
│
├── db/                      # SQLite database files
├── keys/                    # ECDSA public/private keys
└── package.json             # Backend dependencies
```

## Frontend Structure

```
frontend/
├── src/
│   ├── features/            # Feature modules
│   │   ├── users/           # User management feature
│   │   │   ├── domain/      # User entities, DTOs, enums
│   │   │   ├── application/ # Use cases, repository interface
│   │   │   ├── infrastructure/ # HTTP repository, crypto/protobuf services
│   │   │   └── presentation/   # UI components, hooks, containers
│   │   │
│   │   └── stats/           # Statistics feature
│   │       ├── domain/      # DailyStatsDto
│   │       ├── application/ # GetDailyStats use case
│   │       ├── infrastructure/ # StatsRepository
│   │       └── presentation/   # useStats hook
│   │
│   ├── shared/              # Shared resources
│   │   ├── infrastructure/  # HTTP client, interceptors
│   │   ├── presentation/    # Reusable UI components
│   │   │   ├── components/  # Button, Card, Modal, Badge, Toast, etc.
│   │   │   ├── hooks/       # usePagination, useToast
│   │   │   └── icons/       # Centralized Lucide React icons
│   │   ├── constants/       # Error messages
│   │   └── utils/           # Date utilities, classname helpers
│   │
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.tsx # Dark/light mode management
│   │
│   ├── App.tsx              # Root application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
└── package.json             # Frontend dependencies
```

## Use Case Organization (Vertical Slice)

Each use case is self-contained with all its needs:

```
create-user/
├── CreateUserCommand.ts    # Input data structure
├── CreateUserHandler.ts    # Business logic implementation
├── CreateUserRoute.ts      # API endpoint definition
└── CreateUserValidator.ts  # Input validation rules
```

This makes it easy to:
- Find all code related to one feature
- Add new features without touching existing code
- Delete features by removing one folder
