import express, { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { authenticateToken } from '../middlewares/auth';

const jwt = require('jsonwebtoken');

const router: Router = express.Router();

const upload = multer({
  dest: 'uploads/', // specify the root destination folder
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // check if the uploaded file is a movie
    if (file.mimetype !== 'video/mp4') {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

export default router;
