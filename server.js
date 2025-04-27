require("dotenv").config();
const http = require("http");
const express = require("express");
const connectDB = require("./src/db/connect");
const app = express();
const cors = require("cors");
app.use(express.json());

const port = process.env.PORT || 8000;
const { addMessage } = require("./src/controllers/chat/OneToOne");

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});
const userSocketMap = {}; // userId => socket.id

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("📌 Mapped user:", userId, "to socket:", socket.id);
  }

  socket.on("sendPrivateMessage", ({ toUserId, fromUserId, message }) => {
    const targetSocketId = userSocketMap[toUserId];

    const msgObj = {
      to:toUserId,
      from:fromUserId,
      msg:message,
    }
    // addMessage(msgObj)

   if(targetSocketId){
    
    socket.to(targetSocketId).emit("receivePrivateMessage", msgObj); 
   }
   else{
    console.log('Targated Id Not Found', targetSocketId)
   }
  });

  socket.on("addcomment", (comment) => {
    io.emit("receivedcomments", comment)
    socket.broadcast.emit("notifyuser", `${comment.commenter_id} Has commented on post`)
  })

});


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
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
  } catch (error) {
    console.log(error);
  }
};

start();

//Routes Import
const authRouter = require("./src/routes/auth_route");
const MsgRouter = require("./src/routes/chat_route");
const CommonRouter = require("./src/routes/common_route");
const blogRouter = require("./src/routes/blog_route");

const api_v = '/api/v1'
app.use(`${api_v}/user`, authRouter);
app.use(`${api_v}/chat`, MsgRouter);
app.use(`${api_v}/common`, CommonRouter);
app.use(`${api_v}/blog`, blogRouter);
