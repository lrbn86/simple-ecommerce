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
app.get('/v1/apikey', getApiKey);

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

async function handleRegister(req: Request, res: Response, next: NextFunction) {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email || !password) return res.status(400).json({ message: 'Both email and password are required.' });

  const passwordHash = await bcrypt.hash(password, 12);

  const user = {
    id: crypto.randomUUID(),
    email,
    password: passwordHash,
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return res.status(201).json({ message: 'User created successfully', data: { id: user.id, email: user.email, role: user.role } });
}

async function handleLogin(req: Request, res: Response, next: NextFunction) {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email || !password) return res.status(400).json({ message: 'Both email and password are required.' });

  const user = db.findUser(email);
  const fakeHash = await bcrypt.hash('fake-password', 12);
  const ok = await bcrypt.compare(password, user?.password ?? fakeHash);

  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = {
    sub: user?.id,
    email: user?.email,
    role: user?.role,
  };

  if (!process.env.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY undefined');

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });

  return res.status(200).json({ token });
}

async function getApiKey(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  const apiKey = crypto.randomBytes(32).toString('hex');

  db.insertApiKey(user, apiKey);

  return res.status(200).json({ message: `Generated api key for ${user.id}`, apiKey });
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  const name = req?.body?.name;
  const description = req?.body?.description;
  const price = req?.body?.price;
  const imageUrl = req?.body?.imageUrl;

  const product = {
    id: crypto.randomUUID(),
    name,
    description,
    price,
    imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return res.status(201).json({ message: 'Created a product', data: { product } })
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  return res.status(200).json({ message: 'Get products', data: {} });
}

async function getProduct(req: Request, res: Response, next: NextFunction) {
  const productId = req?.params?.productId;
  return res.status(200).json({ message: 'Get product', data: { productId } });
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  const productId = req?.params?.productId;
  return res.status(200).json({ message: 'Update product', data: { productId } });
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const productId = req?.params?.productId;
  return res.status(204).json({ message: 'Deleted a product' });
}

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
