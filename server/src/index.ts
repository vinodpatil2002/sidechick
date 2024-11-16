import express from "express";
import jwt from "jsonwebtoken";
import brainRouter from './routes/brain.route';
import userRouter from './routes/user.route';
import contentRouter from './routes/content.route';

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀")
});

app.use("/api/v1/user",userRouter);
app.use("/api/v1/content",contentRouter);
app.use("/api/v1/brain",brainRouter);

// app.post("api/v1/signup",(req,res)=>{

// })

// app.post("api/v1/signin",(req,res)=>{

// })

// app.post("api/v1/content",(req,res)=>{

// })

// app.get("api/v1/content",(req,res)=>{

// })

// app.post("api/v1/brain/share",(req,res)=>{

// })

// app.get("api/v1/brain/:id",(req,res)=>{

// })
