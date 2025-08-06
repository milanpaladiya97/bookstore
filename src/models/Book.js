import mongoose from 'mongoose';
import { BOOK_CATEGORIES } from '../config/constants.js';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  isbn: {
    type: String,
    unique: true,
    trim: true
  },

  category: {
    type: String,
    enum: BOOK_CATEGORIES,
    default: 'Other'
  },

  publisher: {
    type: String
  },

  publishedDate: {
    type: Date
  },

  language: {
    type: String,
    default: 'English'
  },

  pages: {
    type: Number
  },

  coverImage: {
    type: String
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  discount: {
    type: Number,
    default: 0
  },

  stock: {
    type: Number,
    required: true,
    min: 0
  },

  ratings: {
    type: Number,
    default: 0
  },

  reviewsCount: {
    type: Number,
    default: 0
  }

}, {
  collection: 'books',
  timestamps: true
});

export default mongoose.model('Book', bookSchema);
