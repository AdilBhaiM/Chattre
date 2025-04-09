import React, { useEffect, useRef, useState } from "react";
import ChatBoxImage from "./ChatBoxImage";
import { chatStore } from "../store/ChatStore";
import { authStore } from "../store/AuthStore";

const ChatsContainer = ({ setLoadingMessages }) => {
  const messagesDiv = useRef();
  const { authUser } = authStore();
  const {
    selectedUser,
    getMessages,
    messages,
    setMessages,
    listenMessages,
    stopListeningMessages,
  } = chatStore();

  useEffect(() => {
    async function fetchData() {
      setMessages(null);
      setLoadingMessages(true);
      await getMessages(selectedUser._id).then((response) => {
        setMessages(response);
        listenMessages();
        setLoadingMessages(false);
      });
      return () => stopListeningMessages();
    }
    fetchData();
  }, [selectedUser, setMessages, listenMessages, stopListeningMessages]);

  useEffect(() => {
    if (messagesDiv.current && messages) {
      messagesDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // console.log( messages, 'messages----');

  return (
    <div className="flex flex-col p-6 gap-6 overflow-y-scroll scrollbar flex-1">
      {/* {messages?.AllMessages?.length > 0 && messages.AllMessages.map((message) => ( */}
      {messages?.map((message) => (
        <div
          ref={messagesDiv}
          key={message._id}
          className={`flex gap-5 rounded-[24px] items-end ${
            message.receiverID === authUser._id ? "self-start" : "self-end"
          }`}
        >
          {message.receiverID === authUser._id ? <ChatBoxImage /> : ""}
          <div
            className={`flex flex-col ${
              message.receiverID === authUser._id ? "items-start" : "items-end"
            } gap-2`}
          >
            <p className="text-gray-400">9:00 AM</p>
            <div
              className={`flex flex-col font-semibold bg-white gap-2 rounded-tl-3xl rounded-tr-3xl ${
                message.senderID === authUser._id
                  ? "rounded-br-none rounded-bl-3xl"
                  : "rounded-bl-none rounded-br-3xl"
              } px-3 py-3 text-black text-[18px]`}
            >
              {message.image ? (
                <img
                  src={message.image}
                  alt=""
                  className="rounded-3xl max-w-100"
                />
              ) : (
                ""
              )}
              <h1>{message.text}</h1>
            </div>
          </div>
          {message.senderID === authUser._id ? <ChatBoxImage /> : ""}
        </div>
      ))}
    </div>
  );
};

export default ChatsContainer;
