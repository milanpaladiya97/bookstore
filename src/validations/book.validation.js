import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().min(2).required(),
  author: Joi.string().required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  description: Joi.string().optional(),
  isbn: Joi.string().optional(),
  category: Joi.string().optional(),
  language: Joi.string().optional(),
  coverImage: Joi.string().uri().optional(),
  publisher: Joi.string().optional(),
  publishedDate: Joi.date().optional(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().integer().min(0).optional(),
  description: Joi.string().optional(),
  isbn: Joi.string().optional(),
  category: Joi.string().optional(),
  language: Joi.string().optional(),
  coverImage: Joi.string().uri().optional(),
  publisher: Joi.string().optional(),
  publishedDate: Joi.date().optional(),
});
