import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },

  phone: {
    type: String,
    trim: true
  },

  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    country: { type: String, trim: true }
  },

  profileImage: {
    type: String,
    default: ''
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, {
  collection: 'users',
  timestamps: true
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log("Plain:", candidatePassword);
  console.log("Hash:", this.password);
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
