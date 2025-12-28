import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import authRoutes from "./routes/Route.js";
import SocketHandler from "./SocketHandler.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(cors());

/* -------------------- ROUTES -------------------- */
app.use("/api", authRoutes);

/* -------------------- HTTP + SOCKET.IO -------------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  SocketHandler(socket, io);
});

/* -------------------- DATABASE -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
