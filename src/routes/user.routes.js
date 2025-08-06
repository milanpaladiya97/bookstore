import express from 'express';
import upload from '../middleware/upload.js';
import { updateProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put(
  '/profile',
  protect,
  upload.single('profileImage'),
  updateProfile
);

export default router;
