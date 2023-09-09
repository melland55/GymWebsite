require('dotenv').config({ path: './.env' });
const express = require('express');
const router = express.Router();
const { authenticateToken, authenticateUser } = require('./auth');

const secretKey = process.env.SECRET_KEY;
  
router.get('/database/:username/Image', authenticateToken, authenticateUser, (req, res) => {
    const username = req.params.username;
});

module.exports = router;