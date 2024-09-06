import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import tokenMiddleware from '../middlewares/auth';
import { PrismaClient } from '@prisma/client/edge';

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRoutes.use('/*', tokenMiddleware);

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

blogRoutes.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  });

  try {
    const body = await c.req.json();

    if (!body.title || !body.email) {
      return c.text('Missing required fields', 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.text('Author not found', 404);
    }

    
    const published = body.published === 'true' || body.published === true;

    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content || '', 
        published,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return c.text('Blog post created successfully', 201);
  } catch (error) {
    console.error('Error creating post:', error);
    return c.text('Failed to create blog post', 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.put('/update', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  });

  try {
    const body = await c.req.json();

    if (!body.id || !body.title) {
      return c.text('Missing required fields', 400);
    }

 
    const published = body.published === 'true' || body.published === true;

    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content || '', 
        published, 
      },
    });

    return c.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return c.text('Failed to update post', 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  });

  try {
    const blogs = await prisma.post.findMany();
    return c.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return c.text('Failed to fetch blogs', 500);
  } finally {
    await prisma.$disconnect();
  }
});

export default blogRoutes;
