import Joi from 'joi';

export const createOrderSchema = Joi.object({
  books: Joi.array().items(
    Joi.object({
      book: Joi.string().required(), // book ID
      quantity: Joi.number().integer().min(1).required(),
      priceAtPurchase: Joi.number().required() // store price at time of order
    })
  ).min(1).required(),

  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required()
  }).required(),

  totalAmount: Joi.number().required(),

  paymentMethod: Joi.string().valid('card', 'cod', 'upi', 'wallet').required(),

  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').default('pending')
});
