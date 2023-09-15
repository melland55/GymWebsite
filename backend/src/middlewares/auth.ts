import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const secretKey = (req as any).secretKey
  const token = authHeader && authHeader.split(" ")[1];
  if (token == 'null' || token == null || token == 'undefined') {
    return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized' });
  }
  jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
    }
    (req as any).user = user;
    next();
  });
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secretKey = (req as any).secretKey
  console.log("aaa-" + token);
  console.log(req.params.username);
  if (token == 'null' || token == null) {
    return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized' });
  }
  jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
    }
    if (user.username !== req.params.username) {
      return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
    }
    (req as any).user = user;
    next();
  });
};

export { authenticateToken, authenticateUser };
