const express = require('express');
const { postBlog } = require('../controllers/blog/blog_controller');
const router = express.Router();

router.post('/postblog', postBlog)

module.exports = router
