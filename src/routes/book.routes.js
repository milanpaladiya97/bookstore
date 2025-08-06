import express from 'express';
import { createBookSchema, updateBookSchema } from '../validations/book.validation.js';
import { addBook, deleteBook, getBooks, updateBook } from '../controllers/book.controller.js';
import { protect, isAdmin } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js'

const router = express.Router();
router.get('/', getBooks);
router.post('/', protect, isAdmin, validate(createBookSchema), addBook);
router.put('/:id', protect, isAdmin, validate(updateBookSchema), updateBook);
router.delete('/:id', protect, isAdmin, deleteBook);
export default router;
