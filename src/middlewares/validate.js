
import {STATUS} from '../config/constants.js';
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(STATUS.BAD_REQUEST).json({ errors });
    }
    next();
  };
};

export default validate;
