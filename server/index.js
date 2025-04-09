import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path'
import authRoute from "./src/routes/auth.route.js";
import messageRoute from "./src/routes/message.route.js";
import { connectDB } from "./src/lib/db.js";
import { app, server } from "./src/lib/socket.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, './client/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client", "dist", "index.html"));
  })
}

server.listen(PORT, () => {
  console.log("This Server is listening at localhost:" + PORT);
  connectDB();
});
