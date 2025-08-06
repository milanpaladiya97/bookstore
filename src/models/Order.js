import mongoose from 'mongoose';
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from '../config/constants.js';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceAtPurchase: {
        type: Number,
        required: true
      }
    }
  ],

  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }
  },

  totalAmount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: PAYMENT_STATUS,
    default: 'pending'
  },

  orderStatus: {
    type: String,
    enum: ORDER_STATUS,
    default: 'processing'
  },

  paymentMethod: {
    type: String,
    enum: PAYMENT_METHODS,
    default: 'cod'
  }

}, {
  collection: 'orders',
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
