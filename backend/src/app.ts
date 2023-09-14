import express, { Express, Request, Response, NextFunction } from 'express';
import mysql, { Pool } from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from './routes/login';
import uploadRouter from './routes/upload';
import accountRouter from './routes/account';
import config from './config';

const app: Express = express();
const { mysql: mysqlConfig, auth } = config;

// Set up the database connection pool using the configuration from config.ts
const pool: Pool = mysql.createPool({
  connectionLimit: 10,
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  port: mysqlConfig.port,
});

// Share the database connection pool with all routing files
app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).secretKey = auth.secretKey; // Attach the entire configuration object
  (req as any).pool = pool; // Attach the database connection pool
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/account', accountRouter);

export default app;