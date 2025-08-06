import Book from '../models/Book.js';
import {STATUS, MESSAGES} from '../config/constants.js';

/**
 * Get all books
 */
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(STATUS.OK).json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    return res.status(STATUS.SERVER_ERROR).json({
      message: MESSAGES.BOOK.FETCH_FAILED,
      error: err.message,
    });
  }
};

/**
 * Add a new book
 */
export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(STATUS.CREATED).json(book);
  } catch (err) {
    console.error('Error adding book:', err);
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.BOOK.ADD_FAILED,
      error: err.message,
    });
  }
};

/**
 * Update an existing book by ID
 */
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!book) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.BOOK.NOT_FOUND });
    }

    return res.status(STATUS.OK).json(book);
  } catch (err) {
    console.error('Error updating book:', err);
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.BOOK.UPDATE_FAILED,
      error: err.message,
    });
  }
};

/**
 * Delete a book by ID
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.BOOK.NOT_FOUND });
    }

    return res.status(STATUS.OK).json({ message: MESSAGES.BOOK.DELETED });
  } catch (err) {
    console.error('Error deleting book:', err);
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.BOOK.DELETE_FAILED,
      error: err.message,
    });
  }
};
