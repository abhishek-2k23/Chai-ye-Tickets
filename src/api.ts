import { authenticatedFetch } from "@/lib/auth";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}


interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        accessToken: string;
    }
}

interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    }
}

interface SeatData {
    id: number;
    name: string | null;
    isbooked: number;
    user_id: number | null;
    seat_number: string;
}
interface SeatsResponse {
    success: boolean;
    message: string;
    data: {
        seats: SeatData[];
    }
}

interface BookSeatResponse {
  success: boolean;
  message: string;
  data: {
    bookedSeat: SeatData;
  }
}

export const api = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  fetchSeats: async (): Promise<SeatsResponse> => {
    const response = await fetch(`${API_URL}/seats`);
    console.log("Seats:", response);
    if (!response.ok) {
      throw new Error('Failed to fetch seats');
    }

    return response.json();
  },

  bookSeat: async (seatId: number, userName: string): Promise<BookSeatResponse> => {
    const response = await authenticatedFetch(`${API_URL}/${seatId}/${userName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName }),
    });

    if (!response.ok) {
      throw new Error('Booking failed');
    }

    return response.json();
  },
};