require('dotenv').config({ path: './.env' });
const express = require('express');
const router = express.Router();
const { authenticateToken, authenticateUser } = require('./auth');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
  
router.get('/video/:movieId', (req, res) => {
  const pool = req.pool;
  const movieId = req.params.movieId;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
      } else {
        const sql = 'SELECT * FROM movies WHERE movieId = ?';
        const query = mysql.format(sql, [movieId]);
        connection.query(query, async (err, rows) => {
          connection.release();
          if (err) {
            console.error(err);
            res.status(500).send('Error querying database');
          } else if (rows.length === 0) {
            res.status(404).send('Movie not found');
          } else {
            const movie = rows[0];
            const videoPath = path.join(__dirname, '..', 'videos', movie.fileName);
            const stat = fs.statSync(videoPath);
            const fileSize = stat.size;
            const range = req.headers.range;
            const ext = path.extname(videoPath);
            const contentType = `video/${ext.slice(1)}`;

            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
              const chunksize = end - start + 1;
              const file = fs.createReadStream(videoPath, { start, end });
              const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
              };
              res.writeHead(206, head);
              file.pipe(res);
            } else {
              const head = {
                'Content-Length': fileSize,
                'Content-Type': contentType,
              };
              res.writeHead(200, head);
              fs.createReadStream(videoPath).pipe(res);
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

router.get('/recentlyAdded', authenticateToken, async (req, res) => {
    const pool = req.pool;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error connecting to database');
            } else {
              const sql = 'SELECT * FROM movies ORDER BY  dateAdded ASC LIMIT 50';
              const query = mysql.format(sql);
              connection.query(query, async (err, rows) => {
                connection.release();
                if (err) {
                  console.error(err);
                  res.status(500).send('Error querying database');
                } else {          
                  res.status(200).json(rows);
                }
              });
            }
          });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error querying database');
    }
  });  

  router.get('/thumbnail/:filename', (req, res) => {
    const filename = req.params.filename;

  // Set the path to the image file
    const path = require('path');
    const imagePath = path.join(__dirname, '..', 'thumbnails', filename);
    res.sendFile(imagePath);

  });

module.exports = router;