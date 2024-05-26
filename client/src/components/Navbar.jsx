import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast } from "sonner";
import NavbarLogo from "./NavbarLogo";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // handle logout - clearing the cookie
  const logout = async () => {
    toast.info("Logging out...");
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex bg-white text-sm  text-gray-900 p-4 border-b justify-between items-center ">
      <NavbarLogo />

      <div className="flex space-x-2 items-center">
        <ul className="flex space-x-3 md:space-x-4">
          <li>
            <Link to="/" className="hover:underline underline-offset-8">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="transition ease-in duration-1000 hover:underline underline-offset-8"
            >
              Search
            </Link>
          </li>
        </ul>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <span className="block mt-2 text-white text-xl">
                  {user.fname[0] || "U"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/add-property">Create Listing</Link>
              </li>
              <li>
                <Link to="/listings">My Listings</Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="flex space-x-3">
            <li>
              <Link
                to="/login"
                className="bg-white rounded-full text-black px-4 py-2.5 border"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-gray-800 rounded-full text-white px-4 py-2.5 hover:bg-black transition duration-300"
              >
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
