
const groupChatHandlers = (io, socket, userSocketMap) => {
    socket.on("join-group", ({ groupId }) => {
        socket.join(groupId); // join the specific room
        console.log(`📥 User ${socket.id} joined group: ${groupId}`);
    });

      // 2. Handle sending group message
  socket.on("group-message", ({ groupId, message, sender }) => {
    const msgData = {
      groupId,
      sender,
      message,
      timestamp: Date.now(),
    };

    // Emit to everyone in the room, including the sender
    io.to(groupId).emit("group-message", msgData);
  });

};

module.exports = { groupChatHandlers };
