import React from "react";
import Profile from "./Profile";
import Sidebar from "../components/MainChatBox/Left";
import Chats from "../components/MainChatBox/Right";
import NoChatSelected from "../components/NoChatSelceted";
import { chatStore } from "../store/ChatStore";
import MessageSkeleton from "../components/Skeletons/ChatsLoader";

const Home = () => {
  const { selectedUser } = chatStore();

  return (
    <div className="flex justify-between gap-4 w-full h-screen p-[24px] pt-[104px]">
      <Sidebar />

      {selectedUser ? <Chats /> : <NoChatSelected />}
    </div>
  );
};

export default Home;
