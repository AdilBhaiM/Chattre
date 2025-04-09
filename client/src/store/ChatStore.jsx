import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import { authStore } from "./AuthStore";

export const chatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isLoadingUsers: false,

  getUsers: async () => {
    // console.log(selectedUser)
    set({ isLoadingUsers: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.allUsers });
    } catch (error) {
      console.log("Error in fetching all users = ", error);
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  setMessages: (data) => {
    set({ messages: data });
  },

  getMessages: async (userId) => {
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      return response.data.AllMessages;
    } catch (error) {
      console.log("Error in fetching all messages = ", error);
    }
  },

  sendMessage: async (id, data) => {
    try {
      const res = await axiosInstance.post(`message/send/${id}`, data);
      const currentMessages = get().messages;
      //   console.log(data);
      //   console.log(res.data);
      //   console.log(currentMessages);
      set({ messages: [...currentMessages, res.data.newMessage] });


    } catch (error) {
      console.log("Error in sending message", error);
      toast.error(error);
    }
  },
  listenMessages: () => {
    console.log("Function listening");
    const {selectedUser} = get()
    if(!selectedUser) return;
    const socket = authStore.getState().socket
    console.log(socket.id)
    socket.on("newMessage", (newMessage) => {
        console.log(newMessage);
        set({messages: [...get().messages.filter((message) => message._id !== newMessage._id), newMessage]})
    })
  },
  stopListeningMessages: () => {
    console.log("Function stopp listening");
    const socket = authStore.getState().socket
    socket.off("newMessage")
  }
}));
