const { Server } = require("socket.io");
const { chatHandlers } = require("./handlers/ChatHandlers");
const { commentNotifyHandlers } = require("./handlers/commentNotifyHandlers");

let io;

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });


  const userSocketMap = {}; // userId => socket.id

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
};
