import express from 'express';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import orderRoutes from './routes/order.routes.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

export default app;
