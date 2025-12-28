import { Router } from 'express';
import User from '../models/category';
import { registerUser, getUserHistory, getAllUsers } from '../controllers/userController';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newUser = new User({ name, phone });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/register', registerUser); 
router.get('/:userId/history', getUserHistory); 
router.get('/admin/all', getAllUsers); 

export default router;