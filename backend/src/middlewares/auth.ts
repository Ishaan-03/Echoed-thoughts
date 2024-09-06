import {  Context } from 'hono';
import { verify } from 'hono/jwt';


const tokenMiddleware = async (c: Context, next: () => Promise<void>) => {
  const JWT_SECRET = c.env.JWT_SECRET as string;

  try {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.log('Authorization token not found');
      return c.text('Unauthorized access denied', 401);
    }

    const verifiedPayload = await verify(token, JWT_SECRET);
    console.log('Verified payload:', verifiedPayload);

    c.set('user', verifiedPayload);

    await next();
  } catch (error) {
    console.error('Invalid token:', error);
    return c.text('Invalid token', 403);
  }
};

export default tokenMiddleware;
