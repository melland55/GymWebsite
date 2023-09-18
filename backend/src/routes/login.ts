import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mysql2, { RowDataPacket } from 'mysql2/promise'
import config from '../config';

const router: Router = express.Router();
const saltRounds: number = 10; // the number of salt rounds to use
const { secretKey } = config.auth;

router.post('/', async (req: Request, res: Response) => {
  const pool: mysql2.Pool = (req as any).pool;
  const { username, password } = req.body;

  try{
    const sql = 'CALL GetUserPassword(?)';
    const values = [username];
    const [rows] = await pool.execute<RowDataPacket[]>(sql, values);
    if(rows.length == 0){
      res.status(404).send("Username not found");
      return;
    }
    const user = rows[0][0];
    if (!user || !user.password || !user.salt) {
      res.status(500).send('Invalid data retrieved from the database');
      return;
    }
    const storedPassword = user.password;
    const salt = user.salt;
    const hashedPassword = await bcrypt.hash(password, salt.toString());
    if (hashedPassword === storedPassword.toString()) {
      const token = jwt.sign({ username }, secretKey || '', { expiresIn: '1d' });
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error hashing password');
  }
});

router.post('/register/member', async (req: Request, res: Response) => {
  const pool: mysql2.Pool = (req as any).pool;
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    phoneNumber,
    address1,
    address2,
    city,
    state,
    postal,
    country,
    birthday,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Use pool.execute for query execution
    const sql = 'CALL AddMember(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      username,
      email,
      hashedPassword,
      salt,
      firstName,
      lastName,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      postal,
      country,
      birthday,
    ];

    await pool.execute<RowDataPacket[]>(sql, values);
    res.status(200).json({ message: 'Member added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding member');
  }
});

export default router;