const connectDB = require('../../models');
const { getIo, userSocketMap } = require('../../socket/socket');
const Blog = connectDB.blog;

const postBlog = async (req, res) => {
    const blogData = await Blog.create(req.body)
    const io = getIo();
    const blogWriter_id = userSocketMap[req.body.writer_id]
    
    if (blogWriter_id) {
      io.sockets.sockets.forEach((socket) => {
          if (socket.id !== blogWriter_id) {
            
              socket.emit("newBlogPosted", `${blogWriter_id} Posted New Blog`);
          }
      });
  }

    res.json({msg: "Blog Posted Successfully"})
}

const getBlogs = async (req, res) => {
    try {
      const allBlogs = await Blog.findAll({});
  
      res.json(allBlogs);
    } catch (error) {
      console.error("Error fetching allBlogs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    postBlog,
    getBlogs
};
  