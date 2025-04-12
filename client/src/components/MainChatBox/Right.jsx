import React, { useState } from "react";
import ChatHeader from "../ChatHeader";
import ChatsContainer from "../ChatsContainer.jsx";
import MessageSkeleton from "../Skeletons/ChatsLoader";
import InputMessage from "../InputMessage";

const Chats = () => {
  const [isLoadingMessages, setLoadingMessages] = useState(false);

  // console.log(isLoadingMessages, "------");

  return (
    <div className="flex flex-1 flex-col justify-between bg-gray-900 rounded-2xl">
      <ChatHeader />
      {isLoadingMessages && (
        <div className="flex justify-center items-center h-full">
          <MessageSkeleton />
        </div>
      )}
      {/* {!isLoadingMessages && (
        <ChatsContainer setLoadingMessages={setLoadingMessages} />
      )} */}
      <ChatsContainer setLoadingMessages={setLoadingMessages} />
      <InputMessage />
    </div>
  );
};

export default Chats;
