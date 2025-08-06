import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  role: Joi.string().valid('user', 'admin').optional(),
  address: Joi.object({
    street: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    state: Joi.string().allow('', null),
    zip: Joi.string().allow('', null),
    country: Joi.string().allow('', null)
  }).optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


export const updateProfileSchema = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().min(6).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zip: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional()
});