# Testing Documentation

## Overview

The backend implements a comprehensive testing strategy with three levels: Unit, Integration, and End-to-End tests.

## Test Structure

```
backend/tests/
├── unit/           # Test individual handlers (with mocks)
├── integration/    # Test handlers + repositories
└── e2e/            # Test complete API endpoints
```

## Test Levels

### 1. Unit Tests

**Purpose**: Test individual handlers in isolation

**Location**: `tests/unit/`

**Approach**:
- Mock all dependencies (repositories, services)
- Test business logic only
- Fast execution

**Example**: Test CreateUserHandler validates email and calls repository correctly

### 2. Integration Tests

**Purpose**: Test handlers with real repository (test database)

**Location**: `tests/integration/`

**Approach**:
- Use actual database connection
- Mock only external services (crypto)
- Verify data persistence

**Example**: Test that CreateUserHandler actually saves user to database

### 3. End-to-End (E2E) Tests

**Purpose**: Test complete API flow

**Location**: `tests/e2e/`

**Approach**:
- Make real HTTP requests
- Use actual database
- Test full request/response cycle

**Example**: POST /api/users returns 201 and persists user

## Running Tests

```bash
cd backend

# All tests
yarn test

# Specific test types
yarn test:unit
yarn test:integration
yarn test:e2e

# With coverage report
yarn test:coverage
```

## Test Utilities

### Factories
Create test data consistently:
- `UserFactory.create()` - Generate test users
- `MockFactory.createRepository()` - Generate mock repositories

### Mocks
Reusable mock implementations:
- `createMockUserRepository()` - Mock repository
- `createMockCryptoService()` - Mock crypto service

## Testing Approach

**Test Pyramid**:
```
     /\     E2E Tests (Few, Slow)
    /  \
   / IT \   Integration Tests (Some, Medium)
  /______\  Unit Tests (Many, Fast)
```

- **Many unit tests**: Fast feedback, test edge cases
- **Some integration tests**: Verify components work together
- **Few E2E tests**: Verify critical user flows

## Best Practices

- **Arrange-Act-Assert**: Structure all tests consistently
- **One Assertion Per Test**: Keep tests focused
- **Descriptive Names**: Test names explain what they verify
- **Clean Test Data**: Each test starts with clean state
- **No Test Interdependence**: Tests run independently

## Coverage Goals

- **Unit Tests**: Aim for 80%+ coverage
- **Integration Tests**: Cover all repositories
- **E2E Tests**: Cover all API endpoints
