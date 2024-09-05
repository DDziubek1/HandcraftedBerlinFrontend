import { useState, useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
const Navbar = () => {
    const [token, setToken] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            
          }
      }, []);


    const toggleSearch = () => {
      setShowSearch(!showSearch);
      
    };

    return (
        <>
          <div className="navbar bg-background shadow-md">
            <div className="navbar-start flex items-center h-16">
            {user ? (
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost normal-case text-xl text-primary">
                                Profile
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-background rounded-box w-52">
                                <li>
                                    <Link to="/profile/about" className="text-primary">View Profile</Link>
                                </li>
                                <li>
                                    <Link to="/profile/listings" className="text-primary">Listings</Link>
                                </li>
                                <li>
                                    <Link to="/settings" className="text-primary">Settings</Link>
                                </li>
                                <li>
                                    <button
                                        className="text-primary"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            setToken(null);
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                  <Link to="/signup" className="btn text-lg text-lightSand bg-primary p-2 hover:bg-secondary mr-4">
                    Sign Up
                  </Link>
                  <Link to="/signin" className="btn text-lg text-lightSand bg-primary p-2 hover:bg-secondary mr-2">
                    Sign In
                  </Link>
                </>
                    )}
                
            </div>
            <Link to="/" className="navbar-center hidden md:flex">
            <div className="navbar-center hidden md:flex">
              <img src={logo2} alt="Logo" className="h-16 w-64 mt-2 object-cover" />
            </div>
            </Link>
            <div className="navbar-end flex items-center">
              {user ? (
                <Link to="/cart" className="btn btn-ghost text-neutral hover:text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293-2.293A1 1 0 015 9h14m-4 10a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
              ) : ( <></>)}
            </div>
          </div>
          <div className="md:hidden flex justify-center bg-background">
            <Link to="/" >
              <img src={logo2} alt="Logo" className="h-16 w-64 mt-2 object-cover" />
            </Link>
          </div>
          <div className="bg-secondary">
            <div className="flex flex-wrap justify-center space-x-4 p-2">
              <Link to="/" className="btn btn-ghost normal-case text-lg text-lightSand hover:text-accent">
                Home
              </Link>
              <Link to="/artists" className="btn btn-ghost normal-case text-lg text-lightSand hover:text-accent">
                Artists
              </Link>
              <Link to="/shop" className="btn btn-ghost normal-case text-lg text-lightSand hover:text-accent">
                Shop
              </Link>
              <Link to="/events" className="btn btn-ghost normal-case text-lg text-lightSand hover:text-accent">
                Events
              </Link>
              <Link to="/blog" className="btn btn-ghost normal-case text-lg text-lightSand hover:text-accent">
                Blog
              </Link>
              <button onClick={toggleSearch} className="btn btn-ghost normal-case text-lg text-lightSand hover:text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.5-4.15A7.5 7.5 0 1111 3a7.5 7.5 0 017.5 7.5z"
                  />
                </svg>
              </button>
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered text-primary w-full max-w-xs ml-2"
                />
              )}
            </div>
          </div>
        </>
      );
    };
  
  export default Navbar;