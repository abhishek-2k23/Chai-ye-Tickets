const API_URL = import.meta.env.VITE_API_URL;

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    if (data?.success) {
      localStorage.setItem("accessToken", data.data.accessToken);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    logout();
    return false;
  }
};

// Create an authenticated fetch wrapper that handles token refresh
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("accessToken");

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  let response = await fetch(url, authOptions);

  // If unauthorized, try to refresh token and retry once
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = localStorage.getItem("accessToken");
      const retryOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };
      response = await fetch(url, retryOptions);
    }
  }

  return response;
};