import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});


//middlewares

app.use(express.json());

//app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);



app.listen(8800, () => {
  connect();
  console.log("connected to backend!");
});
