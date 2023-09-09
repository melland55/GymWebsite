require('dotenv').config({ path: './.env' });
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const { authenticateToken, authenticateUser } = require('./auth');
  
  router.delete('/delete/:username', authenticateToken, authenticateUser, (req, res) => {
    const username = req.params.username;
  });

  router.get('/validate/:username', authenticateToken, authenticateUser, (req, res) => {
    return res.status(200).json({ isAuthenticated: true});
  });

module.exports = router;