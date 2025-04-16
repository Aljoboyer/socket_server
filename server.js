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

app.get("/migrate", (req, res) => {
  const db = require("./src/models");
  db.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Synced db.");
      res.send("All database tables are now synced");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
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

//Routes Import
const authRouter = require("./src/routes/auth_route");
const api_v = '/api/v1'
app.use(`${api_v}/user`, authRouter);