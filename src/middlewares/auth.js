import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {STATUS, MESSAGES} from '../config/constants.js';


export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error('Not authorized');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(STATUS.UNAUTHORIZED).json({ message: MESSAGES.USER.UNAUTHORIZED });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(STATUS.FORBIDDEN).json({ message: MESSAGES.USER.ACCESS_DENIED });
  }
  next();
};
