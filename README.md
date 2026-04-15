# Chai-Ye Tickets

Chai-Ye Tickets is a React + TypeScript ticket booking app built with Vite, Tailwind CSS, and shadcn/ui styling.

## Features

- Login / registration flow
- Protected booking page for authenticated users
- Seat grid display with reserved/booked state
- Book seats and update UI in real time
- Toast notifications for success, warning, loading, and error states
- Automatic access token refresh for authenticated API calls
- Logout button displayed in the navbar when logged in

## Project Structure

- `src/App.tsx` — main app container
- `src/main.tsx` — app entry point with theme and toast providers
- `src/router/AppRouter.tsx` — application routes
- `src/router/ProtectedRoute.tsx` — route guard for authenticated pages
- `src/api.ts` — API client for login, register, seat fetching, and booking
- `src/lib/auth.ts` — auth helper utilities and token refresh logic
- `src/components/layout/Navbar.tsx` — top navigation with login/logout logic
- `src/components/sections/SeatGrid.tsx` — seat map and booking UI
- `src/components/ui/ToastProvider.tsx` — toast notification system

## Getting Started

### Install dependencies

```bash
cd seat-grab
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the `seat-grab` folder with:

```env
VITE_API_URL=https://seat-grab-backend.onrender.com
```

Adjust the URL to point to your backend API.

## Authentication Flow

- User logs in or registers via `src/pages/Auth.tsx`
- Access token is stored in `localStorage`
- `src/lib/auth.ts` provides `isAuthenticated`, `logout`, and `authenticatedFetch`
- Protected booking routes require authentication

## Booking Flow

- Seats are fetched from `/seats`
- The seat grid uses `seat_number` to map UI seats
- Booked seats are shown in green and display the booker name on hover
- Booking uses `api.bookSeat()` and refreshes UI state on success

## Toast Notifications

The app uses a custom toast provider located in `src/components/ui/ToastProvider.tsx`.

It supports:

- `success`
- `warning`
- `loading`
- `error`

## Notes

- The navbar title is `Chai-Ye Tickets`
- When logged in, the navbar shows a `Logout` button instead of `Book Now`
- The app currently expects a working backend with auth and seat booking endpoints

---

Enjoy building with Chai-Ye Tickets! 🚀
