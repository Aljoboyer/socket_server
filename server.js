require("dotenv").config();
const http = require("http");
const express = require("express");
const connectDB = require("./src/db/connect");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8000;

app.use(express.json());

app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );

app.get("/", (req, res) => {
  res.send("Chat App");
});


const start = async () => {
  try {
    // connectDB
    await connectDB().authenticate();
    app.listen(port, (req, res) => {
      console.log("Server is Running")
    });
  } catch (error) {
    console.log(error);
  }
};

start();
