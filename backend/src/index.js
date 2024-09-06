import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import bcrypt from 'bcrypt';
const app = new Hono();
const saltRounds = 10;
app.post('/api/v1/user/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const JWT_SECRET = c.env.JWT_SECRET;
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
            return c.text('User already exists', 409);
        }
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                Name: body.Name,
            },
        });
        const payload = {
            userId: newUser.id,
        };
        const token = await sign(payload, JWT_SECRET);
        return c.json({ token }, 201);
    }
    catch (error) {
        console.error('Error creating user:', error);
        return c.text('User creation failed', 500);
    }
    finally {
        await prisma.$disconnect();
    }
});
app.post('/api/v1/user/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const JWT_SECRET = c.env.JWT_SECRET;
    const body = await c.req.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            console.error('User not found');
            return c.text('User not found', 404);
        }
        const passwordMatch = await bcrypt.compare(body.password, user.password);
        if (!passwordMatch) {
            return c.text('Invalid email or password', 401);
        }
        const payload = {
            userId: user.id,
        };
        const token = await sign(payload, JWT_SECRET);
        return c.json({ token }, 200);
    }
    catch (error) {
        console.error('Error signing in:', error);
        return c.text('Sign in failed', 500);
    }
    finally {
        await prisma.$disconnect();
    }
});
app.get('/api/v1/blog/:id', async (c) => {
    const JWT_SECRET = c.env.JWT_SECRET;
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
    }
    catch (error) {
        console.error('Invalid token:', error);
        return c.text('Invalid token', 403);
    }
});
app.post('/api/v1/blog', (c) => {
    return c.text('Post blog');
});
app.put('/api/v1/blog', (c) => {
    return c.text('Update blog');
});
app.get('/api/v1/blog/bulk', (c) => {
    return c.text('Search blog');
});
export default app;
