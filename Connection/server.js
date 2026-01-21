const express = require("express");
const dotenv=require("dotenv");
const connectDB=require("./db");
const authRoutes=require("../Routes/authRoutes");
const todoRoutes=require("../Routes/todoRoutes");
const cors=require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app=express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/todoRoutes",todoRoutes);

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})