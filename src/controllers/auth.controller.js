import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { STATUS, MESSAGES } from '../config/constants.js';

/**
 * Generates a JWT token for a given user
 * @param {Object} user - Mongoose User document
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

/**
 * Registers a new user
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(STATUS.CONFLICT).json({
        message: MESSAGES.USER.EMAIL_EXISTS
      });
    }

    const user = await User.create({ name, email, password, phone, role });

    const { password: _, ...userData } = user.toObject();

    return res.status(STATUS.CREATED).json({
      message: MESSAGES.USER.REGISTER_SUCCESS,
      user: userData
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.USER.REGISTER_FAILED,
      error: err.message
    });
  }
};

/**
 * Logs in an existing user
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: MESSAGES.USER.LOGIN_FAILED
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: MESSAGES.USER.LOGIN_FAILED
      });
    }

    const token = generateToken(user);
    const { password: _, ...userData } = user.toObject();

    return res.status(STATUS.OK).json({
      message: MESSAGES.USER.LOGIN_SUCCESS,
      token,
      user: userData
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(STATUS.SERVER_ERROR).json({
      message: MESSAGES.USER.GENERAL_ERROR,
      error: err.message
    });
  }
};
