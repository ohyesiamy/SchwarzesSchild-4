# Schwarzes Schild Banking Application

## Overview
Schwarzes Schild is a banking application with a sleek, modern interface built using React for the frontend and Express for the backend. The application uses Drizzle ORM with PostgreSQL for data storage and features account management, transaction tracking, card management, and currency exchange functionality.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: React Query for server state
- **Routing**: Wouter for lightweight routing
- **Form Handling**: React Hook Form with Zod validation

The frontend is built with a component-based architecture, with reusable UI components from shadcn/ui. The application follows a minimalist black and white design theme with the Playfair Display font for branding elements.

### Backend
- **Framework**: Express.js with TypeScript
- **API**: RESTful API endpoints for data operations
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Management**: express-session with a store backend

The backend follows a modular design with separate route handlers for different functional areas (accounts, transactions, cards, etc.) and centralized error handling.

### Data Storage
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Schema**: Typed schema definitions with Zod validation

The database schema includes tables for users, accounts, transactions, cards, and currency exchanges, with proper relationships between entities.

### Authentication Flow
1. Username/password authentication using Passport.js
2. Two-factor authentication (currently simulated in the frontend)
3. Session-based persistence

## Key Components

### User Management
- Registration with email, password, and personal details
- Login with optional 2FA
- User profile management

### Account Management
- Multiple currency accounts per user
- Balance tracking
- Account creation and management

### Transaction System
- Transaction recording and categorization
- Transaction history with filtering options
- Support for different transaction types

### Card Management
- Virtual card display and management
- Card freezing/unfreezing functionality
- Spending limit controls

### Currency Exchange
- Exchange between different currencies
- Real-time exchange rate simulation
- Exchange history tracking

## Data Flow

1. **Authentication**:
   - Client submits credentials → Server validates → Session created → Client redirected to dashboard

2. **Account Operations**:
   - Client requests account data → Server validates session → Queries database → Returns account data

3. **Transactions**:
   - Create: Client submits transaction → Server validates → Updates database → Returns confirmation
   - List: Client requests transactions → Server retrieves filtered data → Returns to client

4. **Card Management**:
   - Client requests card data → Server validates → Returns card information
   - Card status changes → Server updates database → Returns updated status

5. **Currency Exchange**:
   - Client submits exchange request → Server calculates rates → Updates account balances → Returns confirmation

## External Dependencies

### Frontend Libraries
- **@radix-ui**: For accessible UI primitives
- **@tanstack/react-query**: For data fetching and caching
- **class-variance-authority**: For component styling variants
- **date-fns**: For date formatting and manipulation
- **zod**: For schema validation

### Backend Libraries
- **express**: Web server framework
- **passport**: Authentication middleware
- **drizzle-orm**: Database ORM
- **@neondatabase/serverless**: PostgreSQL database connector

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**:
   - Using `npm run dev` to run both backend and frontend in development
   - Vite development server with HMR for frontend

2. **Production Build**:
   - Frontend built with Vite (`vite build`)
   - Backend bundled with esbuild
   - Output to `dist` directory

3. **Database**:
   - External PostgreSQL database (likely Neon.tech based on imports)
   - Connection configured via `DATABASE_URL` environment variable

4. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SESSION_SECRET`: For securing session cookies
   - `NODE_ENV`: To determine runtime environment

The application is designed to scale with a serverless architecture, leveraging Neon's serverless PostgreSQL offering for the database and Replit's deployment infrastructure.