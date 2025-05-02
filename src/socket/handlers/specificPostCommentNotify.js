
const specificPostCommentNotify = (io, socket, userSocketMap) => {
  socket.on("commentedonpost", ({ blog_writer, commenter_id, commentText , blog_id}) => {
    const targetSocketId = userSocketMap[blog_writer];
    
    socket.broadcast.emit('commentadded', {blog_writer, commenter_id, commentText, blog_id})
    if (targetSocketId) {
      socket.to(targetSocketId).emit("notifyoncomment", `${commenter_id} Commented on your Blog`);
    } else {
      console.log('Target ID Not Found', targetSocketId);
    }

  });
};

module.exports = { specificPostCommentNotify };
