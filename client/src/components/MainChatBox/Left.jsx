import React, { useEffect, useMemo, useRef } from "react";
import { chatStore } from "../../store/ChatStore.jsx";
import SidebarSkeleton from "../Skeletons/SidebarSkeleton.jsx";
import { authStore } from "../../store/AuthStore.jsx";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, selectedUser, isLoadingUsers } =
    chatStore();

    const { onlineUsers } = authStore();

  useEffect(() => {
    // console.log("getting users");
    getUsers();
  }, [getUsers]);

  return (
    <div className="flex flex-col justify-between gap-6 w-[30%] bg-gray-900 rounded-2xl p-8">
      <h1 className="text-white text-2xl">All Users</h1>

      <div className="flex flex-col gap-2 flex-1">
        {/* All Users ---------------------------- */}

        {isLoadingUsers ? (
          <SidebarSkeleton />
        ) : (
          users.map((user) => (
            <button
              onClick={() => {
                setSelectedUser(user);
              }}
              key={user._id}
              className={`group flex relative gap-5 rounded-[16px] cursor-pointer items-center ${selectedUser?._id == user._id ? "bg-gray-700" : ""
                }`}
            >
              <div
                className={`absolute w-[0%] left-[50%] translate-x-[-50%] bg-gray-800 transition-all duration-200 h-[0%] rounded-[16px] ${selectedUser?._id == user._id
                    ? ""
                    : "group-hover:w-full group-hover:h-full"
                  } z-0`}
              ></div>
              <div className="flex gap-5 px-8 py-5 z-1 items-center">
                <div className="relative flex items-center">

                    {onlineUsers.includes(user._id) ? (
                    <span
                      className="absolute right-0 top-0 size-3 bg-green-500 
                      rounded-full ring-2 ring-zinc-900"
                    />
                  ): (
                    <span
                      className="absolute right-0 top-0 size-3 rounded-full border-3 border-gray-400"
                    />
                  )}
                  <img
                    src={`${user.profilePic || "../../assets/avatar.png"}`}
                    alt=""
                    className="size-12 object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h1 className="font-semibold text-white text-[18px]">
                    {user.fullName}
                  </h1>
                  <p className="text-gray-400">Hello this is john</p>
                </div>
              </div>
            </button>
          ))
        )}
        {/* {users.map((user) => (
                <button
                onClick={()=>{
                  console.log(user);
                  setSelectedUser(user)
                }}
                key={user._id}
                className={`flex gap-5 px-8 py-5 rounded-[24px] cursor-pointer items-center hover:bg-gray-700 ${selectedUser?._id == user._id ? 'bg-gray-800' : ''}`}>
                  <img src={`${user.profilePic}`} alt="" className="size-12 object-cover rounded-full"/>
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="font-semibold text-white text-[18px]">{user.fullName}</h1>
                    <p className="text-gray-400">Hello this is john</p>
                  </div>
                </button>
              )
            )
          } */}
      </div>
    </div>
  );
};

export default Sidebar;
