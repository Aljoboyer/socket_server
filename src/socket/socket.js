const { Server } = require("socket.io");
const { chatHandlers } = require("./handlers/ChatHandlers");
const { commentNotifyHandlers } = require("./handlers/commentNotifyHandlers");
const { onCommentNotify } = require("./handlers/onCommentNotify");
const { groupChatHandlers } = require("./handlers/groupChatHandlers");

let io;
const userSocketMap = {}; 

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    socket.emit("onlineUsers", Object.keys(userSocketMap));

    if (userId) {
      userSocketMap[userId] = socket.id;

      io.emit("userOnline", userId);

      console.log("📌 Mapped user:", userId, "to socket:", socket.id);
    }

    // Register different handlers
    chatHandlers(io, socket, userSocketMap);
    commentNotifyHandlers(io, socket, userSocketMap);
    onCommentNotify(io, socket, userSocketMap)
    groupChatHandlers(io, socket, userSocketMap)

    socket.on("disconnect", () => {
      // Find and remove user from userSocketMap
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          console.log(`🧹 Removed mapping for user: ${userId}`);
          io.emit("userOffline", userId);
          break;
        }
      }
    });
    
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  init,
  getIo,
  userSocketMap
};
