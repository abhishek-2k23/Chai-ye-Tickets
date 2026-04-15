import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "@/lib/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 py-6 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">

      <h1 className="text-2xl font-bold text-primary text-glow">
        Chai-Ye Tickets
      </h1>

      <div className="flex items-center gap-6">

        <Link to="/" className="hover:text-primary">Home</Link>

        {isAuth ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl bg-primary text-white"
          >
            Book Now
          </button>
        )}

        {/* {!isAuth && (
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-border hover:bg-muted"
          >
            Login
          </Link>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;