import express from 'express'; 
import { registerUser, loginUser, getUserById, getAllUsers } from '../controllers/userController';
import { protect, authorize } from '../middleware/authorize';

const router = express.Router(); 


router.post('/register', registerUser);

router.get('/', protect, authorize('admin'), getAllUsers);

router.get('/:id', protect, getUserById);

router.post('/login', loginUser);

export default router;