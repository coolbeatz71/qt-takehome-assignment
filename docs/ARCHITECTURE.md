# Architecture Documentation

## Overview

This project uses **Clean Architecture** with **CQRS** (Command Query Responsibility Segregation). This keeps code organized, testable, and maintainable by separating different concerns into distinct layers.

## The Four Layers

```
Presentation → Application → Domain ← Infrastructure
```

### 1. Domain Layer (Core)

**Purpose**: Business entities and rules

**Contains**: User entity, Email value object, UserRole/UserStatus enums, business rules

**Why**: Business logic stays pure and framework-independent

### 2. Application Layer

**Purpose**: Implements user actions (use cases)

**Contains**:
- **Commands** (writes): Create/Update/Delete User
- **Queries** (reads): Get Users, Get Statistics
- **Repository Interfaces**: Define what data operations are needed

**Why**: Separating reads from writes makes code clearer and easier to optimize

### 3. Infrastructure Layer

**Purpose**: Technical implementation

**Contains**: Database (SQLite), repository implementations, crypto/protobuf services, HTTP client

**Why**: You can swap implementations without changing business logic

### 4. Presentation Layer

**Purpose**: User interface

**Contains**:
- **Backend**: Express API routes
- **Frontend**: React components, hooks, containers

**Why**: UI changes don't affect business rules

## Key Patterns

**Repository Pattern**: Data access through interfaces, not direct SQL
- Business logic doesn't know about databases
- Easy to test with mock data

**Dependency Injection**: Central container manages all services
- Loose coupling between components
- Easy to replace dependencies

**Vertical Slice**: Each feature in its own folder
- All CreateUser code together
- Easy to find related code

## Communication Flow

**Backend**: HTTP Request → Route → Handler → Repository → Database → Response

**Frontend**: User Action → Component → Hook → Use Case → HTTP → State Update → UI

## Benefits

- **Testability**: Each layer tested independently
- **Maintainability**: Changes stay localized
- **Flexibility**: Easy to swap implementations
- **Scalability**: Optimize reads/writes separately
- **Clarity**: Clear boundaries and responsibilities
