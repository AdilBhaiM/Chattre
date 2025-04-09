import React from "react";
import { authStore } from "../store/AuthStore";
import { useState } from "react";
import { Eye, EyeClosed, Loader, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {signup, isSigningUp} = authStore()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const validateForm = ()=>{
    if(!formData.fullName.trim()) return toast.error("Name is Required")
    if(!formData.email.trim()) return toast.error("Email is Required")
    if(!/\S+@\S+\.\S+/.test(formData.email.trim())) return toast.error("Email must be valid")
    if(!formData.password.trim()) return toast.error("Password is Required")
    if(formData.password.trim().length < 6) return toast.error("Password must be at least 6 charactors")

    return true
  }

  const handleSubmit= (e)=>{
    e.preventDefault();
    
    const validInputs = validateForm();

    if(validInputs === true) {
      signup(formData)
    }

  }

  // const { isSigningUp } = authStore();
  return (
    <div className="flex items-center h-screen">
      <form 
      onSubmit={handleSubmit}
      className="flex flex-col items-center min-w-[50%] gap-6 m-auto bg-gray-900 rounded-2xl p-8">
        <div className="flex gap-2  p-[20px] bg-gray-700 rounded-2xl">
          <h2 className="text-blue-50 font-bold text-3xl">Sign Up</h2>
          <LogIn color="#d1d1d1" strokeWidth={1.75} className="self-center size-8" />
        </div>
        
        <p className="text-gray-300 text-[18px]">Get Started With Free Account</p>

        <div className="flex flex-col w-[100%] gap-2">
          <p className="flex gap-2 flex-col text-white">Full Name</p>
          <input
          value={formData.fullName}
          required
          onChange={(e)=>{setFormData({...formData, fullName:e.target.value })}}
          placeholder="Full Name"
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
          />
        </div>

        <div className="flex flex-col w-[100%] gap-2">
          <p className="flex gap-2 flex-col text-white">Email</p>
          <input
          value={formData.email}
          onChange={(e)=>{setFormData({...formData, email:e.target.value })}}
          placeholder="Email"
          required
          type="email"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100" />
        </div>

        <div className="flex flex-col w-[100%] gap-2 relative">
          <p className="flex gap-2 flex-col text-white">Password</p>
          <input
          value={formData.password}
          required
          onChange={(e)=>{setFormData({...formData, password:e.target.value })}}
          placeholder="Password"
          type={showPassword? "text": "password"}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100" />
          {!showPassword ? (
            <Eye 
              color="#404040" 
              className="absolute bottom-3 right-5 cursor-pointer" 
              strokeWidth={1.75} 
              onClick={() => setShowPassword(true)}
            />
            ) : (
            <EyeClosed 
              color="#404040"
              className="absolute bottom-3 right-5 cursor-pointer" 
              strokeWidth={1.75} 
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        <button
        type="submit"
        // onClick={validateForm}
        disabled={isSigningUp}
        className="text-white h-[50px] mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold cursor-pointer rounded-lg text-[18px] w-[100%] p-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        { isSigningUp
        ? (
          <div className="flex items-center justify-center gap-4">
            <Loader color="#ffffff" strokeWidth={1.75} />
            Loading...
          </div>
        ):
        (
          "Create Account"
        )}
        </button>
        <p className="text-white">
          Already have an account?{" "}
          <Link
          to='/login'
          className="text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
