const { addMessage } = require("../../controllers/chat/OneToOne");

const chatHandlers = (io, socket, userSocketMap) => {
  socket.on("sendPrivateMessage", ({ toUserId, fromUserId, message }) => {
    const targetSocketId = userSocketMap[toUserId];

    const msgObj = {
      to: toUserId,
      from: fromUserId,
      msg: message,
    };
    const fromSocketId = userSocketMap[fromUserId];

    if (fromSocketId) {
      socket.emit("messageDelivered", {
        toUserId,
        fromUserId
      });
    }

    if (targetSocketId) {
      socket.to(targetSocketId).emit("receivePrivateMessage", msgObj);
    } else {
      console.log('Target ID Not Found', targetSocketId);
    }

    // Optionally save message in DB
    // addMessage(msgObj);
  });

  socket.on('typingon', ({toUserId, fromUserId}) => {
    const targetSocketId = userSocketMap[toUserId];
    socket.to(targetSocketId).emit("typingstatuson", {toUserId, fromUserId})
  })

  socket.on('typingoff', ({toUserId, fromUserId}) => {
    const targetSocketId = userSocketMap[toUserId];
    socket.to(targetSocketId).emit("typingstatusoff", {toUserId, fromUserId})
  })

  socket.on("messageSeen", ({fromUserId, toUserId }) => {
    const toSocketId = userSocketMap[toUserId];
    if (toSocketId) {
    console.log('seen triggered', fromUserId, toUserId)
      socket.to(toSocketId).emit("messageSeenReceived", {
        fromUserId,
        toUserId
      });
    }
  });
  

};

module.exports = { chatHandlers };
