# QT Takehome Assignment

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

> Enterprise-grade full-stack admin panel featuring secure user management, real-time analytics, and ECDSA cryptographic verification.

## 🎯 Overview

A sophisticated user management system built with **Clean Architecture** principles, featuring cryptographic security, efficient data serialization, and a modern responsive UI.

**Key Highlights:**

- 🔐 **ECDSA P-384** signature verification for email authenticity
- 📦 **Protocol Buffers** for efficient binary data serialization
- 📊 **Real-time Analytics** with timezone-aware statistics
- 🎨 **Modern UI** with dark mode and responsive design
- ✅ **Type-Safe** end-to-end TypeScript implementation

## ✨ Features

### User Management

- Create, read, update, and delete users
- Email validation with domain-driven value objects
- Role-based access control (Admin, User, Guest)
- Status management (Active, Inactive)
- Automatic ECDSA signature generation

### Cryptographic Security

- ECDSA P-384 digital signatures for email verification
- Client-side signature verification using Web Crypto API
- Public key distribution endpoint
- Tamper-proof user data integrity

### Data Export & Analytics

- Protocol Buffer export for efficient data transfer
- Real-time dashboard with user statistics
- 7-day trend analysis with interactive charts
- Timezone-aware date handling

### User Experience

- Responsive design (mobile + desktop)
- Dark/Light mode with system preference detection
- Toast notifications for user feedback
- Skeleton loaders for perceived performance
- Confirmation modals for destructive actions

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js with TypeScript 5.9
- **Framework**: Express 5.1
- **Database**: SQLite (better-sqlite3)
- **Cryptography**: Node.js crypto (ECDSA P-384)
- **Serialization**: Protocol Buffers (protobufjs)
- **Testing**: Jest + ts-jest

### Frontend

- **Framework**: React 19.1 with TypeScript
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 3.4
- **HTTP Client**: Axios 1.12
- **Charts**: Recharts 3.2
- **Cryptography**: Web Crypto API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+

### Installation

```bash
# Clone the repository
git clone https://github.com/coolbeatz71/qt-takehome-assignment.git
cd qt-takehome-assignment

# Install all dependencies (root + backend + frontend)
yarn install:all
```

### Development

```bash
# Run both backend and frontend concurrently
yarn dev

# Backend will start on http://localhost:3000
# Frontend will start on http://localhost:5173
```

### Individual Services

```bash
# Backend only
yarn dev:backend

# Frontend only
yarn dev:frontend
```

### Testing

```bash
# Backend tests
cd backend
yarn test              # Run all tests
yarn test:unit         # Unit tests only
yarn test:integration  # Integration tests
yarn test:e2e          # End-to-end tests
yarn test:coverage     # Generate coverage report
```

### Production Build

```bash
# Backend
cd backend
yarn build
yarn start

# Frontend
cd frontend
yarn build
yarn preview
```

## 📚 Documentation

For detailed documentation, please refer to the `/docs` directory:

- **[Architecture](docs/ARCHITECTURE.md)** - Clean Architecture, CQRS, and design patterns
- **[Folder Structure](docs/FOLDER_STRUCTURE.md)** - Detailed project organization
- **[API Documentation](docs/API.md)** - Complete API endpoint reference
- **[Security](docs/SECURITY.md)** - ECDSA implementation and signature verification
- **[Testing](docs/TESTING.md)** - Testing strategy and guidelines

## 📡 Quick API Reference

### Base URL

```
http://localhost:3000
```

### Key Endpoints

```http
GET    /api/users         # Get all users
POST   /api/users         # Create user
GET    /api/users/:id     # Get user by ID
PUT    /api/users/:id     # Update user
DELETE /api/users/:id     # Delete user
GET    /api/users/stats   # Get 7-day statistics
GET    /api/users/export  # Export as Protocol Buffer
GET    /api/public-key    # Get ECDSA public key
```

See [API Documentation](docs/API.md) for complete details.

## 💻 Development

### Environment Variables

#### Backend `.env`

```env
PORT=3000
NODE_ENV=development
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000
```

## 👤 Author

**Mutombo Jean-Vincent (coolbeatz71)**

- GitHub: [@coolbeatz71](https://github.com/coolbeatz71)
- Repository: [qt-takehome-assignment](https://github.com/coolbeatz71/qt-takehome-assignment)

## 🙏 Acknowledgments

Developed as part of **QT Global Software Ltd** technical assessment.

---

Built with ❤️ using Clean Architecture, TypeScript, and modern web technologies.
