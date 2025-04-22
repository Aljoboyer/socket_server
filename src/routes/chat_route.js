const express = require('express');
const { getChats } = require('../controllers/chat/OneToOne');
const router = express.Router();

router.get('/get-one-to-one-chat', getChats)

module.exports = router
