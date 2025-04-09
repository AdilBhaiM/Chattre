import React, { useEffect, useMemo, useRef } from "react";
import { authStore } from "../store/AuthStore";
import { useState } from "react";
import { Camera, ContactRound, CookingPot, Eye, EyeClosed, Key, Loader, LogIn } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {

  const save_button = useRef(null)
  const navigate = useNavigate();
  const { isUpdatingProfile , authUser, updateProfile} = authStore()
  const [selectedImage, setSelectedImage] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    profilePic: `${selectedImage || authUser.profilePic}`
  });

  const convertUploadedImage = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePic: base64Image,
      }));
    }
  }
  
  useEffect(() => {
    // console.log("__________________");
    setSelectedImage(`${authUser.profilePic}`)
    // console.log(`${authUser.profilePic}`);
    // console.log(selectedImage);
    // console.log(formData);
    // console.log("__________________");
    setFormData({
      ...formData,
      fullName: authUser.fullName
    })
  }, [isUpdatingProfile])

  const validateForm = ()=>{
    if(!formData.fullName.trim()) return toast.error("Name is Required")
    return true
  }

  const handleSubmit = async (e)=>{
    console.log("hello");
    e.preventDefault();
    const validform = validateForm();
    if(validform === true) 
    {
      await updateProfile(formData)
    }
  }

  useEffect(() => {
    // console.log("Checking");
    // console.log("PP :", formData.profilePic !== authUser.profilePic , "FullName", formData.fullName !== authUser.fullName);
    // console.log(formData);
    if (formData.profilePic !== authUser.profilePic || formData.fullName !== authUser.fullName) {
      if (save_button.current) {
        save_button.current.disabled = false;
        save_button.current.style.cursor = "pointer";
      }
    } else {
      if (save_button.current) {
        save_button.current.disabled = true;
        save_button.current.style.cursor = "auto";
      }
    }
  }, [selectedImage, formData, authUser, isUpdatingProfile]);

  return (
    <div className="flex items-center h-screen">
    <form 
    onSubmit={handleSubmit}
    className="flex flex-col items-center min-w-[50%] gap-6 m-auto bg-gray-900 rounded-2xl p-8">
      <div className="flex gap-4  p-[20px] bg-gray-700 rounded-2xl">
        <h2 className="text-blue-50 font-bold text-3xl">Profile</h2>
        <ContactRound color="#d1d1d1" strokeWidth={1.75} className="self-center size-8"/>
      </div>
        <p className="text-gray-300 text-[18px]">Apni profile ki tasveer upload krdo</p>

        {/* Inputs ------------------------------------- */}

        {/* Image Input ------------- */}
        <div className="relative p-0.5 border-white border-3 rounded-full">

          <img
          src={selectedImage || authUser.profilePic || '../../assets/avatar.png'}
          alt=""
          className="size-32 rounded-full object-cover"
          />

          <label htmlFor="avatar_uploader" className="flex items-center transition-all translate-y-[-100%] rounded-full bg-[#e3e3e3] absolute right-0 w-fit h-fit p-[8px] bg-base-content cursor-pointer hover:scale-105">

            <Camera color="#595959" strokeWidth={1.75} className="size-5" />

            <input
            className="w-5 hidden h-5"
            accept="image/*"
            onChange={convertUploadedImage}
            id="avatar_uploader"
            type="file"
            />
          </label>
        </div>

        {/* Full Name Input -------------  */}

        <div className="flex flex-col w-[100%] gap-2">
          <p className="flex gap-2 flex-col text-white">Full Name</p>
          <input
          value={formData.fullName}
          // required
          onChange={(e)=>{
            setFormData({...formData, fullName:e.target.value})
            // console.log(formData);
          }}
          placeholder="Full Name"
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
          />
        </div>
        
        {/* Email Input ------------- */}
        
      <div className="flex flex-col w-[100%] gap-2">
        <p className="flex gap-2 flex-col text-white">Email</p>
        <input
        value={authUser.email}
        onChange={()=>toast.error("You cannot change your Email.")}
        placeholder="Email"
        required
        type="email"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100" />
      </div>

      <button
      ref={save_button}
      disabled={isUpdatingProfile}
      type="submit"
      className="text-white h-[50px] mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold cursor-pointer rounded-lg text-[18px] w-[100%] p-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      { isUpdatingProfile
      ? (
        <div className="flex items-center justify-center gap-4">
          <Loader color="#ffffff" strokeWidth={1.75} />
          Updating...
        </div>
      ):
      (
        "Save"
      )}
      </button>
      <button
      onClick={()=>navigate("/")}
      type="button"
      className="text-gray-900 cursor-pointer hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 
      w-[100%] font-semibold text-[18px] focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Back</button>
    </form>
  </div>
  )
}

export default Profile