import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      
      {/* Logo */}
      <h1 className="text-3xl font-bold text-primary text-glow mb-2">
        NOIR CURATOR
      </h1>
      <p className="text-muted-foreground mb-10 tracking-widest text-sm">
        THE PRIVATE DIGITAL GALLERY
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 space-y-6 shadow-xl">
        
        <div>
          <h2 className="text-2xl font-semibold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isLogin
              ? "Access your curated selection."
              : "Join the noir experience."}
          </p>
        </div>

        {!isLogin && (
          <div>
            <label className="text-xs text-muted-foreground">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
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
            placeholder="curator@noir.com"
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs text-muted-foreground">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
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
              placeholder="••••••••"
              className="w-full mt-2 p-3 rounded-lg bg-muted border border-border outline-none"
            />
          </div>
        )}

        {/* Button */}
        <button className="w-full py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:scale-105 transition-all">
          {isLogin ? "ENTER THE GALLERY" : "CREATE ACCOUNT"}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Not registered yet?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary cursor-pointer hover:underline"
          >
            {isLogin ? "Register now" : "Login"}
          </span>
        </p>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        © 2024 NOIR CURATOR. ALL RIGHTS RESERVED.
      </p>
    </div>
  );
};

export default Auth;