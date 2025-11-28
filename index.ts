if (!process.env.PORT) throw new Error('PORT undefined');

import crypto from 'node:crypto';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { rateLimit } from 'express-rate-limit';
import { Pool } from 'pg';
import morgan from 'morgan';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(rateLimit());
app.use(morgan('combined'));

app.post('/v1/register', handleRegister);
app.post('/v1/login', handleLogin);

app.post('/v1/products', createProduct);
app.get('/v1/products', getProducts);
app.get('/v1/products/:productId', getProduct);
app.put('/v1/products/:productId', updateProduct);
app.delete('/v1/products/:productId', deleteProduct);

app.post('/v1/cart', createCart);
app.post('/v1/cart/:cartId/items', addItemToCart);
app.put('/v1/cart/:cartId/items/:itemId', updateItemInCart);
app.get('/v1/cart/:cartId', getCart);
app.delete('/v1/cart/:cartId/items/:itemId', deleteItemFromCart);
app.delete('/v1/cart/:cartId/items', clearCart);

app.post('/v1/orders', createOrder);
app.get('/v1/orders', getOrders);
app.get('/v1/orders/:orderId', getOrder);
app.put('/v1/orders/:orderId', updateOrder);
app.delete('/v1/orders/:orderId', deleteOrder);

app.post('/v1/payments', createPayment);
app.get('/v1/payments', getPayments);
app.get('/v1/payments/:paymentId', getPayment);
app.post('/v1/payments/webhook', paymentWebhook);

app.use(handleNotFound);
app.use(handleError);

app.listen(process.env.PORT, handleServerStart);

async function handleServerStart() {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
}

async function handleRegister(req: Request, res: Response, next: NextFunction) { }

async function handleLogin(req: Request, res: Response, next: NextFunction) { }

async function createProduct(req: Request, res: Response, next: NextFunction) { }

async function getProducts(req: Request, res: Response, next: NextFunction) { }

async function getProduct(req: Request, res: Response, next: NextFunction) { }

async function updateProduct(req: Request, res: Response, next: NextFunction) { }

async function deleteProduct(req: Request, res: Response, next: NextFunction) { }

async function createCart(req: Request, res: Response, next: NextFunction) { }

async function addItemToCart(req: Request, res: Response, next: NextFunction) { }

async function updateItemInCart(req: Request, res: Response, next: NextFunction) { }

async function getCart(req: Request, res: Response, next: NextFunction) { }

async function deleteItemFromCart(req: Request, res: Response, next: NextFunction) { }

async function clearCart(req: Request, res: Response, next: NextFunction) { }

async function createOrder(req: Request, res: Response, next: NextFunction) { }

async function getOrders(req: Request, res: Response, next: NextFunction) { }

async function getOrder(req: Request, res: Response, next: NextFunction) { }

async function updateOrder(req: Request, res: Response, next: NextFunction) { }

async function deleteOrder(req: Request, res: Response, next: NextFunction) { }

async function createPayment(req: Request, res: Response, next: NextFunction) { }

async function getPayments(req: Request, res: Response, next: NextFunction) { }

async function getPayment(req: Request, res: Response, next: NextFunction) { }

async function paymentWebhook(req: Request, res: Response, next: NextFunction) { }

async function handleNotFound(req: Request, res: Response, next: NextFunction) {
  return res.sendStatus(404);
}

async function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  return res.sendStatus(500);
}
