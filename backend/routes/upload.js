require('dotenv').config({ path: './.env' });
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('./auth');

const upload = multer({ 
  dest: 'uploads/', // specify the root destination folder
  fileFilter: (req, file, cb) => {
    // check if the uploaded file is a movie
    if (file.mimetype !== 'video/mp4') {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

router.post('/movies', authenticateToken, upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail1', maxCount: 1 },
  { name: 'thumbnail2', maxCount: 1 }
]), async (req, res) => {
  try {
    // Extract the movie data from the request body
    const { title, description, year, length } = req.body;

    // Extract the file and thumbnail paths from the request
    const { file, thumbnail1, thumbnail2 } = req.files;

    // Generate a unique identifier for the current upload
    const uploadId = Date.now().toString();

    // Create a new directory for the current upload
    await fs.mkdir(`uploads/${uploadId}`);

    // Generate unique filenames for the uploaded files
    const fileFilename = `${Date.now()}_${file[0].originalname}`;
    const thumbnail1Filename = `${Date.now()}_${thumbnail1[0].originalname}`;
    const thumbnail2Filename = `${Date.now()}_${thumbnail2[0].originalname}`;

    // Move the files to the server's storage directory
    await Promise.all([
      fs.rename(file[0].path, path.join(`uploads/${uploadId}`, fileFilename)),
      fs.rename(thumbnail1[0].path, path.join(`uploads/${uploadId}`, thumbnail1Filename)),
      fs.rename(thumbnail2[0].path, path.join(`uploads/${uploadId}`, thumbnail2Filename))
    ]);

    // Insert the movie data into the MySQL database
    const [result] = await pool.execute(
      'INSERT INTO movies (title, description, year, length, file_path, thumbnail1_path, thumbnail2_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, year, length, `${uploadId}/${fileFilename}`, `${uploadId}/${thumbnail1Filename}`, `${uploadId}/${thumbnail2Filename}`]
    );

    // Send a success response with the newly created movie ID
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while uploading the movie' });
  }
});

module.exports = router;