import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
   
    axios.post("https://handcraftedberlinbackend.onrender.com/auth/signup", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
        
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background px-4">
      <div className="card w-full max-w-md p-6 md:p-10 bg-lightSand shadow-lg">
        <h1 className="text-center text-2xl font-bold text-neutral mb-6">
          Sign up
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
          <div className="mb-4">
            <label
              className="block text-neutral text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="input input-bordered w-full text-neutral"
              id="username"
              type="text"
              placeholder="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
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
          <div className="flex items-right justify-between">
            <button
              className="btn bg-secondary hover:bg-accent text-lightSand ml-auto"
              type="submit"
            >
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;