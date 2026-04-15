const Login = () => {
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
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">
            Access your curated selection.
          </p>
        </div>

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

        {/* Button */}
        <button className="w-full py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:scale-105 transition-all">
          ENTER THE GALLERY
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Request Invite
        </p>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        © 2024 CHAI-YE TICKETS. ALL RIGHTS RESERVED.
      </p>
    </div>
  );
};

export default Login;