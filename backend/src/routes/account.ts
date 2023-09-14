import express, { Request, Response, Router } from 'express';
import { authenticateUser } from './auth';

const router: Router = express.Router();

router.delete('/delete/:username', authenticateUser, (req: Request, res: Response) => {
  const username: string = req.params.username;
});

router.get('/validate/:username',  authenticateUser, (req: Request, res: Response) => {
  return res.status(200).json({ isAuthenticated: true });
});

export default router;
