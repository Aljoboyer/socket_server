const express = require('express');
const { postBlog, getBlogs } = require('../controllers/blog/blog_controller');
const router = express.Router();

router.post('/postblog', postBlog)
router.get('/allblog', getBlogs)

module.exports = router
