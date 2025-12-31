import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IUser from '../models/user';
import ErrorResponse from '../utils/aiResponse';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('נא להתחבר למערכת', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbackSecretKey') as any;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    const user = await IUser.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('משתמש לא קיים', 401));
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('טוקן לא תקין', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    console.log("User Role from DB:", req.user.role);
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse(`אין הרשאת גישה`, 403));
    }
    next();
  };
};