import React, { useState } from "react";
import { CircleUserRound, LogOut, MessageSquare, Settings } from "lucide-react";
import { authStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const [iconHovered, setIconHovered] = useState(false);
  const {authUser, logout} = authStore();
  const navigate = useNavigate();

  return (
    <div
    className="fixed w-[100%] flex justify-between px-20 bg-gray-900 py-6 overflow-hidden">
      <div
      className="group cursor-pointer flex gap-3 overflow-hidden"
      onClick={()=>navigate('/')}
      >
        <MessageSquare
          color="#d1d1d1"
          strokeWidth={1.75}
          className="transition-all size-8 transform group-hover:rotate-[-45deg]"
        />
        <h3
        className="text-blue-50 text-2xl ml-[-30px] opacity-0 transition-all group-hover:ml-[0px] group-hover:opacity-100">
          Chattre
        </h3>
      </div>

      {/* Navbar options -------------- */}
      <div
      className="flex gap-6">
        <div
        className="group overflow-hidden duration-200 relative cursor-pointer flex items-center gap-2 w-[28px] transition-all hover:w-[108px]">
          <Settings
            color="#d1d1d1"
            strokeWidth={1.75}
            className="transition-all group-hover:rotate-[-90deg]"
          />
          <h6 className="absolute duration-300 right-10 transition-all text-blue-50 text-[20px] group-hover:right-0">
            Settings
          </h6>
        </div>

        { authUser
          ? (

            <div className="flex gap-6">
              
              <div
              onClick={()=>{navigate('/profile')}}
              className="group overflow-hidden duration-200 relative cursor-pointer flex items-center gap-2 w-[28px] transition-all hover:w-[95px]">
                <CircleUserRound
                  color="#d1d1d1"
                  strokeWidth={1.75}
                  className="transition-all group-hover:rotate-[-45deg]"
                />
                <h6 className="absolute duration-300 inline right-10 text-blue-50 text-[20px] group-hover:right-0 transition-all">
                  Profile
                </h6>
              </div>
              <div
              onClick={logout}
              className="group overflow-hidden duration-200 relative cursor-pointer flex items-center gap-2 w-[32px] transition-all hover:w-[100px]">
                <LogOut
                  color="#d1d1d1"
                  strokeWidth={1.75}
                  className="transition-all group-hover:rotate-[-45deg]"
                />
                <h6 className="absolute duration-300 inline right-10 text-blue-50 text-[20px] group-hover:right-0 transition-all">
                  Logout
                </h6>
              </div>
            </div>
          ) : ""
        }

      </div>
    </div>
  );
};

export default Navbar;
