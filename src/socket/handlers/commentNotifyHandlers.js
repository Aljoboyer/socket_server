
const commentNotifyHandlers = (io, socket, userSocketMap) => {
    socket.on("addcomment", (comment) => {
        io.emit("receivedcomments", comment)
        socket.broadcast.emit("notifyuser", `${comment.commenter_id} Has commented on post`)
      })
};

module.exports = { commentNotifyHandlers };
