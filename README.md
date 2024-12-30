# User Management System

A full-stack Next.js application that demonstrates form handling, database operations, and modern web development practices.

## Features

- User registration form with validation
- Real-time user list display
- PostgreSQL database integration
- Modern UI with Tailwind CSS and shadcn/ui
- Form validation using Zod
- Toast notifications for user feedback
- Responsive design

## Tech Stack

- **Frontend**: Next.js 13 with App Router, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL (via @vercel/postgres)
- **Form Handling**: react-hook-form, zod
- **Icons**: lucide-react

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- PostgreSQL database

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   POSTGRES_URL="your-postgres-connection-string"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Decisions

### Database Schema

The application uses a simple but effective database schema:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

Key decisions:
- Used `SERIAL` for auto-incrementing IDs
- Added `created_at` timestamp for tracking entry creation
- Set appropriate constraints on name and age fields
- Used PostgreSQL for robust data integrity and scalability

### API Design

The API follows RESTful principles with two main endpoints:
- `POST /api/users`: Creates a new user
- `GET /api/users`: Retrieves all users

Features:
- Input validation using Zod
- Error handling with appropriate status codes
- Type safety with TypeScript
- Automatic table creation if not exists

### Frontend Architecture

The frontend is built with modern React practices:
- Component-based architecture
- Custom hooks for data fetching
- Form validation with react-hook-form and zod
- Real-time updates using custom events
- Responsive design with Tailwind CSS

## Deployment Instructions for Heroku

1. Create a new Heroku application:
   ```bash
   heroku create your-app-name
   ```

2. Add PostgreSQL addon:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

3. Configure environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   ```

4. Deploy the application:
   ```bash
   git push heroku main
   ```

5. Run database migrations:
   The application will automatically create the required tables on first run.

### Post-Deployment Verification

1. Visit your application URL:
   ```bash
   heroku open
   ```

2. Monitor the application logs:
   ```bash
   heroku logs --tail
   ```

## Best Practices Implemented

1. **Code Organization**
   - Separate components for form and list views
   - Modular API routes
   - Type definitions for data structures

2. **Security**
   - Input validation on both client and server
   - SQL injection prevention using parameterized queries
   - Environment variable usage for sensitive data

3. **Performance**
   - Optimized database queries
   - Client-side form validation
   - Efficient state management

4. **User Experience**
   - Loading states
   - Error handling with user-friendly messages
   - Responsive design for all screen sizes
   - Form validation feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.