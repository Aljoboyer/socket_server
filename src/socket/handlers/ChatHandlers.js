const { addMessage } = require("../../controllers/chat/OneToOne");
const currentChatMap = {}; 

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

// ---------------Msg status tracking--------------//
      const fromSocketId = userSocketMap[fromUserId];
        console.log('currentChat ===>', currentChatMap)

        if (currentChatMap[toUserId] === fromUserId) {
          // Mark as SEEN
          io.to(fromSocketId).emit("messageSeenReceived", {
            status: "seen",
          });
        } else {
          // Mark as DELIVERED
          io.to(fromSocketId).emit("messageDelivered", {
            status: "delivered",
          });
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
   
  });

// -------------For handling message seen/delivered status----------//
    socket.on("chatOpened", ({ toUserId, fromUserId }) => {
      
        if(currentChatMap[fromUserId] === toUserId){
          const toSocketId = userSocketMap[toUserId];
          if (toSocketId) {
            socket.to(toSocketId).emit("messageSeenReceived", {
              fromUserId,
              toUserId
            });
          }
        }
        else{
          currentChatMap[fromUserId] = toUserId;
          const toSocketId = userSocketMap[toUserId];
          if (toSocketId) {
            socket.to(toSocketId).emit("messageSeenReceived", {
              fromUserId,
              toUserId
            });
          }
        }
        

    });

    socket.on("chatClosed", ({ fromUserId }) => {
      delete currentChatMap[fromUserId];
    });        

};

module.exports = { chatHandlers };
