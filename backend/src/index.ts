import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const saltRounds = 10;

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const JWT_SECRET = c.env.JWT_SECRET as string;
  const body = await c.req.json();

  try {
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      console.error('User already exists, unable to sign up');
      return c.text('User already exists');
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        Name: body.Name,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return c.json({ token });
  } catch (error) {
    console.error('Error creating user:', error);
    return c.text('User creation failed');
  }
});

app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const JWT_SECRET = c.env.JWT_SECRET as string;
  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      console.error('User not found');
      return c.text('User not found');
    }

    if (await bcrypt.compare(body.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return c.json({ token });
    } else {
      return c.text('Invalid email or password');
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return c.text('Sign in failed');
  }
});

app.post('/api/v1/blog', (c) => {
  return c.text('Post blog');
});

app.put('/api/v1/blog', (c) => {
  return c.text('Update blog');
});

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  console.log(id);
  return c.text('Get blog route');
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Search blog');
});

export default app;
