import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import IUser from '../models/user';
import ErrorResponse from '../utils/aiResponse';
import * as jwt from 'jsonwebtoken';


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, phone, role } = req.body;

   
    if (!id || !name || !phone) {
      return next(new ErrorResponse('נא לספק תעודת זהות, שם ומספר טלפון', 400));
    }

    const existingUser = await IUser.findById(id);
    if (existingUser) {
      return next(new ErrorResponse('משתמש עם תעודת זהות זו כבר קיים במערכת', 400));
    }

    const existingPhone = await IUser.findOne({ phone });
    if (existingPhone) {
      return next(new ErrorResponse('מספר הטלפון הזה כבר רשום במערכת למשתמש אחר', 400));
    }

   
    const user = await userService.createUser({ _id: id, name, phone, role: role || 'user' });

   
   // יצירת הטוקן
    const secret = process.env.JWT_SECRET || 'fallbackSecretKey';
    const expire = process.env.JWT_EXPIRE || '30d';

    const token = jwt.sign(
      { id: user._id },
      secret as jwt.Secret, 
      { expiresIn: expire as any }
    );

   
    res.status(201).json({
      success: true,
      message: 'המשתמש נרשם בהצלחה',
      token, 
      data: user
    });
  } catch (error: any) {
    next(error);
  }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, phone, name } = req.body;

    if (!id || !phone || !name) {
      return next(new ErrorResponse('נא לספק שם, תעודת זהות ומספר טלפון', 400));
    }

    const userExists = await IUser.findById(id);
    
    if (!userExists) {
      return next(new ErrorResponse('אתה עוד לא רשום, נא להירשם קודם', 404));
    }

    const user = await IUser.findOne({ _id: id, phone, name });

    if (!user) {
      return next(new ErrorResponse('פרטי התחברות שגויים (שם או טלפון לא תואמים)', 401));
    }

    // יצירת טוקן (נשאר אותו דבר)
    const secret = process.env.JWT_SECRET || 'fallbackSecretKey';
    const expire = process.env.JWT_EXPIRE || '30d';
    const token = jwt.sign({ id: user._id }, secret as jwt.Secret, { expiresIn: expire as any });

    res.status(200).json({ success: true, token, data: user });
  } catch (error) {
    next(error);
  }
};


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await IUser.find().skip(skip).limit(limit);
    const total = await IUser.countDocuments();

    res.status(200).json({ 
      success: true, 
      count: users.length, 
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users 
    });
  } catch (error) {
    next(error);
  }
};


export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    
    if (!user) {
      return next(new ErrorResponse('משתמש לא נמצא', 404));
    }

    res.status(200).json({ 
      success: true, 
      data: user 
    });
  } catch (error: any) {
    next(error);
  }
};