import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { useToast } from "@/components/ui/ToastProvider.tsx";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        toast.showToast("Signing in...", "loading");
        const response = await api.login({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.showToast("Welcome back! Redirecting to booking.", "success");
        navigate("/booking");
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.showToast("Passwords do not match.", "warning");
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        toast.showToast("Creating your account...", "loading");
        const response = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsLogin(true);
        toast.showToast("Registration successful! Please login.", "success");
        setError("Registration successful! Please login.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      toast.showToast(message, "error");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-primary text-glow mb-2">
        CHAI-YE TICKETS
      </h1>
      <p className="text-muted-foreground mb-10 tracking-widest text-sm">
        THE TICKET BOOKING EXPERIENCE
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 space-y-6 shadow-xl">
        <div>
          <h2 className="text-2xl font-semibold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isLogin
              ? "Log in to reserve your next seat."
              : "Create your account and book tickets faster."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs text-muted-foreground">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-muted-foreground">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
              required
            />
          </div>

          {/* 🔥 Register Only Field */}
          {!isLogin && (
            <div>
              <label className="text-xs text-muted-foreground">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
                required
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : (isLogin ? "ENTER THE EXPERIENCE" : "CREATE ACCOUNT")}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Not registered yet?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-primary cursor-pointer hover:underline"
          >
            {isLogin ? "Register now" : "Login"}
          </span>
        </p>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        © 2024 CHAI-YE TICKETS. ALL RIGHTS RESERVED.
      </p>
    </div>
  );
};

export default Auth;
