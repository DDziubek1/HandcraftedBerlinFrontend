import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    const login = (data) => {
        axios
          .post("http://localhost:3000/auth/login", data)
          .then((res) => {
            setIsLoggedIn(res.data.user);
            localStorage.setItem("token", res.data.token);
          })
          .catch((err) => {
            localStorage.removeItem("token");
          });
      };
    
      const signup = (data) => {
        axios
          .post("http://localhost:3000/auth/signup", data)
          .then((res) => {})
          .catch(console.log);
      };
    
      const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
      };
    
      useEffect(() => {
        axios
          .get("http://localhost:3000/auth/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data)
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

    
    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, signup, logout}}>
            {children}
        </AuthContext.Provider>

    );
};

