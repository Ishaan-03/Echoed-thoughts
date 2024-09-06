
import { Hono } from 'hono';
import {verify} from 'hono/jwt'
import tokenMiddleware from '../middlewares/auth';

const blogRoutes = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

  blogRoutes.use('/api/v1/blog/*', tokenMiddleware);
  blogRoutes.get('/:id', async (c) => {
    const JWT_SECRET = c.env.JWT_SECRET as string;
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return c.text('Missing token', 401); 
    }
  
    try {
      const verifiedPayload = await verify(token, JWT_SECRET);
      console.log('Verified payload:', verifiedPayload);
  
      const id = c.req.param('id');
      console.log(id);
      return c.text(`Get blog route for ID: ${id}`);
    } catch (error) {
      console.error('Invalid token:', error);
      return c.text('Invalid token', 403); 
    }
  });
  
  blogRoutes.post('/', (c) => {
    return c.text('Post blog');
  });
  
  blogRoutes.put('/update', (c) => {
    return c.text('Update blog');
  });
  
  blogRoutes.get('/bulk', (c) => {
    return c.text('Search blog');
  });

  export default blogRoutes; 