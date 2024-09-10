import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import { signupInput, signinInput } from "@ishaan03/echoed-common/dist/zod";
import { cors } from 'hono/cors';

const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const saltRounds = 10;

userRoutes.use('*', cors({
  origin: '*', 
}));

userRoutes.options('*', (c) => {
  return c.text('Preflight request');
});

userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const JWT_SECRET = c.env.JWT_SECRET as string;
  const body = await c.req.json();

  const { success, error } = signupInput.safeParse(body);
  if (!success) {
    console.error('Invalid input:', error.errors);
    return c.json({ message: "Invalid input", errors: error.errors }, 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      console.error('User already exists');
      return c.text('User already exists', 409);
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        Name: body.name,  
      },
    });

    const payload = { userId: newUser.id, email: newUser.email };
    const token = await sign(payload, JWT_SECRET);

    return c.json({ token }, 201);
  } catch (error) {
    console.error('Error creating user:', error);
    return c.text('User creation failed', 500);
  } finally {
    await prisma.$disconnect();
  }
});

userRoutes.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const JWT_SECRET = c.env.JWT_SECRET as string;
  const body = await c.req.json();

  const { success, error } = signinInput.safeParse(body);
  if (!success) {
    console.error('Invalid input:', error.errors);
    return c.json({ message: "Invalid input", errors: error.errors }, 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      console.error('User not found');
      return c.text('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      return c.text('Invalid email or password', 401);
    }

    const payload = { userId: user.id, email: user.email };
    const token = await sign(payload, JWT_SECRET);

    return c.json({ token }, 200);
  } catch (error) {
    console.error('Error signing in:', error);
    return c.text('Sign in failed', 500);
  } finally {
    await prisma.$disconnect();
  }
});

export default userRoutes;
