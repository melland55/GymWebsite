import { Request, Response, NextFunction } from 'express';
declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { authenticateToken, authenticateUser };
