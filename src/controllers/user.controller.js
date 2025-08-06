import User from '../models/user.model.js';
import { STATUS, MESSAGES } from '../config/constants.js';

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.USER.USER_NOT_FOUND });
    }

    const { name, address } = req.body;

    if (typeof name === 'string' && name.trim() !== '') {
      user.name = name.trim();
    }

    if (address && typeof address === 'object') {
      user.address = {
        ...user.address,
        ...address,
      };
    }

    if (req.file?.filename) {
      user.profileImage = `/uploads/profile-images/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    return res.status(STATUS.OK).json({
      message: MESSAGES.USER.PROFILE_UPDATED_SUCCESS,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      profileImage: updatedUser.profileImage,
    });

  } catch (err) {
    console.error('Profile update error:', err);
    return res.status(STATUS.SERVER_ERROR).json({
      message: MESSAGES.USER.PROFILE_UPDATE_FAILED,
      error: err.message,
    });
  }
};
