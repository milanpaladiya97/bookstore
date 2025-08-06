import express from 'express';
import { createOrderSchema } from '../validations/order.validation.js';
import { placeOrder, getMyOrders } from '../controllers/order.controller.js';
import { protect } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js'

const router = express.Router();
router.post('/', protect, validate(createOrderSchema), placeOrder);
router.get('/my-orders', protect, getMyOrders);
export default router;
