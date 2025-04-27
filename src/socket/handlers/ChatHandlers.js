const { addMessage } = require("../../controllers/chat/OneToOne");

const chatHandlers = (io, socket, userSocketMap) => {
  socket.on("sendPrivateMessage", ({ toUserId, fromUserId, message }) => {
    const targetSocketId = userSocketMap[toUserId];

    const msgObj = {
      to: toUserId,
      from: fromUserId,
      msg: message,
    };

    if (targetSocketId) {
      socket.to(targetSocketId).emit("receivePrivateMessage", msgObj);
    } else {
      console.log('Target ID Not Found', targetSocketId);
    }

    // Optionally save message in DB
    // addMessage(msgObj);
  });
};

module.exports = { chatHandlers };
