import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const isLoginRoute = location.pathname === "/login";

  const copyToClipboard = async (value: string, field: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

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
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-slate-950/10" />
      <div className="relative mx-auto flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl rounded-[2rem] p-8 shadow-2xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
            <div className="lg:w-2/3">

              <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">
                    {isLogin ? "Welcome Back" : "Create an Account"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
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
                        className="w-full mt-2 p-3 rounded-2xl bg-muted border border-border outline-none"
                        required
                      />
                    </div>
                  )}

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
                      className="w-full mt-2 p-3 rounded-2xl bg-muted border border-border outline-none"
                      required
                    />
                  </div>

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
                      className="w-full mt-2 p-3 rounded-2xl bg-muted border border-border outline-none"
                      required
                    />
                  </div>

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
                        className="w-full mt-2 p-3 rounded-2xl bg-muted border border-border outline-none"
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : (isLogin ? "ENTER THE EXPERIENCE" : "CREATE ACCOUNT")}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                  {isLogin ? "Not registered yet?" : "Already have an account?"}{" "}
                  <span
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                    }}
                    className="text-primary cursor-pointer font-semibold hover:underline"
                  >
                    {isLogin ? "Register now" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoginRoute && isLogin && (
        <div className="fixed bottom-6 right-6 z-20 w-full max-w-xs rounded-[1.75rem] border border-border/60 bg-muted/95 p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Demo login
              </p>
              <p className="mt-2 text-sm font-semibold">Quick start access</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white text-sm font-bold">
              Demo
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-border bg-background px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-medium">test@gmail.com</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("test@gmail.com", "email")}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs hover:bg-background transition"
                >
                  {copiedField === "email" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Password
                  </p>
                  <p className="mt-1 text-sm font-medium">12345678</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("12345678", "password")}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs hover:bg-background transition"
                >
                  {copiedField === "password" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
