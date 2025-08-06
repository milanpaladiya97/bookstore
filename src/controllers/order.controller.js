import Order from '../models/Order.js';
import {STATUS, MESSAGES} from '../config/constants.js';

/**
 * Place a new order
 */
export const placeOrder = async (req, res) => {
  try {
    const { books, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.ORDER.INVALID_BOOKS });
    }

    if (!shippingAddress || typeof shippingAddress !== 'object') {
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.ORDER.INVALID_ADDRESS });
    }

    if (!paymentMethod || typeof paymentMethod !== 'string') {
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.ORDER.INVALID_PAYMENT });
    }

    const totalAmount = books.reduce((sum, item) => {
      if (!item.priceAtPurchase || !item.quantity) {
        throw new Error(MESSAGES.ORDER.INVALID_BOOK_ITEM);
      }
      return sum + item.priceAtPurchase * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user._id,
      books,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    return res.status(STATUS.CREATED).json({ message: MESSAGES.ORDER.PLACED, order });

  } catch (error) {
    console.error('Order placement error:', error);
    return res.status(STATUS.SERVER_ERROR).json({ message: MESSAGES.ORDER.PLACE_FAILED, error: error.message });
  }
};

/**
 * Get all orders for the current user
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('books.book');
    return res.status(STATUS.OK).json(orders);
  } catch (error) {
    console.error('Fetching orders failed:', error);
    return res.status(STATUS.SERVER_ERROR).json({ message: MESSAGES.ORDER.FETCH_FAILED, error: error.message });
  }
};
