export const isAuthenticated = () => {
  return document.cookie.includes("refreshToken");
};