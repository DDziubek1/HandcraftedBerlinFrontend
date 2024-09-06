import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user,setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    
    
    axios.post("https://handcraftedberlinbackend.onrender.com/auth/login", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(true);
        
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background px-4">
      <div className="card w-full max-w-md p-6 md:p-10 bg-lightSand shadow-lg">
        <h1 className="text-center text-2xl font-bold text-neutral mb-6">
          Sign in
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-neutral text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="input input-bordered w-full text-neutral"
              id="email"
              type="text"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label
              className="block text-neutral text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="input input-bordered w-full text-neutral"
              id="password"
              type="password"
              placeholder="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <a
              className="text-sm text-secondary hover:text-accent"
              href="#"
            >
              Forgot password?
            </a>
            <button
              className="btn bg-secondary hover:bg-accent text-lightSand"
              type="submit"
            >
              Sign in!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;