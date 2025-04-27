const connectDB = require('../../models');
const Blog = connectDB.blog;

const postBlog = async (req, res) => {
    const blogData = await Blog.create(req.body)
    await blogData.save() 
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
  