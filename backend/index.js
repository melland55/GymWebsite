const express = require('express');
const mysql = require('mysql');
const loginRouter = require('./routes/login');
const uploadRouter = require('./routes/upload');
const accountRouter = require('./routes/account');
const movieRouter = require('./routes/movie');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
});

// Share the database connection pool with all routing files
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/account', accountRouter);
app.use('/movie', movieRouter);
  
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server listening on port '+port);
});