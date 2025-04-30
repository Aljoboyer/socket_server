const express = require('express');
const { createGroupController, getUserGroup } = require('../controllers/chat/groupcontroller');
const router = express.Router();

router.post('/create-group', createGroupController)
router.get('/user-group/:id', getUserGroup)

module.exports = router
