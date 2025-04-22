const express = require('express');
const { getAllActiveUser } = require('../controllers/common_controller');
const router = express.Router();

router.get('/get-active-user', getAllActiveUser)

module.exports = router
