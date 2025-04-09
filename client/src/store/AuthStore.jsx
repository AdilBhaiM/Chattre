import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const baseURL =  import.meta.env.MODE === "developement" ? "http://localhost:3002": "/";

export const authStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isSigningUp: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in CheckAuth: " + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Loggedin Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (data) => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log(data);
      const res = await axiosInstance.post("/auth/updateprofile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error in updating profile: " + error);
      // toast.error('Error in updating profile', error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(baseURL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("GettingOnlineUsers", (userIds) => {
      // console.log("ids",userIds);
      set({ onlineUsers: userIds });
    });
  },
  
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
