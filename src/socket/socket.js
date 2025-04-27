const { Server } = require("socket.io");
const { chatHandlers } = require("./handlers/ChatHandlers");
const { commentNotifyHandlers } = require("./handlers/commentNotifyHandlers");

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

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log("📌 Mapped user:", userId, "to socket:", socket.id);
    }

    // Register different handlers
    chatHandlers(io, socket, userSocketMap);
    commentNotifyHandlers(io, socket, userSocketMap);
    // registerNotificationHandlers(io, socket, userSocketMap);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    
      // Find and remove user from userSocketMap
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          console.log(`🧹 Removed mapping for user: ${userId}`);
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
