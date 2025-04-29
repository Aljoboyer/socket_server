const express = require('express');
const { createGroupController } = require('../controllers/chat/groupcontroller');
const router = express.Router();

router.post('/create-group', createGroupController)

module.exports = router
