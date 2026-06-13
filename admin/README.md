# BiteXpress Admin Panel

A comprehensive admin dashboard for managing the BiteXpress food delivery platform. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Dashboard**: Overview statistics including total users, restaurants, orders, and revenue
- **Restaurant Management**: View, edit, and delete restaurants with full details
- **Order Management**: Track and manage orders with status updates (pending, preparing, on the way, delivered, cancelled)
- **User Management**: View and manage all platform users with role-based access
- **Menu Management**: Manage menu items for each restaurant
- **Analytics**: Visual charts and reports for revenue, orders, and performance metrics
- **Settings**: Admin profile, security, notification, and system settings

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons (Font Awesome)
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173/admin/login
```

### Default Admin Credentials

- **Email**: admin@bitexpress.com
- **Password**: admin123

## Project Structure

```
admin/
├── src/
│   ├── components/       # Reusable components (Sidebar, Header, ProtectedRoute)
│   ├── context/          # React Context for authentication
│   ├── pages/            # Page components (Dashboard, Restaurants, Orders, etc.)
│   ├── services/         # API services and HTTP client
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles with Tailwind directives
├── public/               # Static assets
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The admin panel connects to the backend API at the URL specified in `VITE_API_URL`. Ensure the backend server is running before starting the admin panel.

### API Endpoints Used

- `POST /api/auth/login` - Admin authentication
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/restaurants` - Get all restaurants
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `DELETE /api/admin/restaurants/:id` - Delete restaurant
- `DELETE /api/admin/orders/:id` - Delete order

## Authentication

The admin panel uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests via an Axios interceptor.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## License

This project is part of the BiteXpress food delivery platform.

