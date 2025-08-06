export const STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

export const MESSAGES = {
    USER: {
        USER_NOT_FOUND: 'User not found',
        PROFILE_UPDATED_SUCCESS: 'Profile updated successfully',
        PROFILE_UPDATE_FAILED: 'Failed to update profile',
        REGISTER_SUCCESS: 'User registered successfully',
        REGISTER_FAILED: 'Registration failed',
        EMAIL_EXISTS: 'Email already registered',
        LOGIN_SUCCESS: 'Login successful',
        LOGIN_FAILED: 'Invalid email or password',
        GENERAL_ERROR: 'Something went wrong',
    },
    ORDER: {
        PLACED: 'Order placed successfully',
        FETCH_FAILED: 'Failed to fetch orders',
        PLACE_FAILED: 'Failed to place order',
    },
    BOOK: {
        DELETED: 'Book deleted successfully',
        NOT_FOUND: 'Book not found',
        FETCH_FAILED: 'Failed to fetch books',
    },
    GENERAL: {
        INVALID_INPUT: 'Invalid input',
        SOMETHING_WENT_WRONG: 'Something went wrong',
    },
    ORDER: {
        PLACED: 'Order placed successfully',
        PLACE_FAILED: 'Failed to place order',
        FETCH_FAILED: 'Failed to fetch orders',
        INVALID_BOOKS: 'At least one book is required to place an order.',
        INVALID_ADDRESS: 'Valid shipping address is required.',
        INVALID_PAYMENT: 'Payment method is required.',
        INVALID_BOOK_ITEM: 'Invalid book item: priceAtPurchase and quantity are required.',
    }
};

export const BOOK_CATEGORIES = [
  'Fiction',
  'Non-fiction',
  'Children',
  'Education',
  'Comics',
  'Self-help',
  'Biography',
  'Technology',
  'Other'
];

export const USER_ROLES = ['user', 'admin'];

export const PAYMENT_STATUS = ['pending', 'paid', 'failed'];

export const ORDER_STATUS = ['processing', 'shipped', 'delivered', 'cancelled'];

export const PAYMENT_METHODS = ['cod', 'card', 'wallet', 'upi'];