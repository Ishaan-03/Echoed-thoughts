import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { createBlogInput, updateBlogInput } from "@ishaan03/echoed-common/dist/zod";
import tokenMiddleware from '../middlewares/auth';

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRoutes.use('/*', tokenMiddleware);

const createPrismaClient = (url: string) => {
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
};

blogRoutes.get('/bulk', async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
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

blogRoutes.get('/:id', async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const id = c.req.param('id');

  if (!id) {
    return c.text('Missing blog ID', 400);
  }

  try {
    const blog = await prisma.post.findUnique({
      where: { id },
    });

    if (!blog) {
      return c.text('Blog not found', 404);
    }

    return c.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return c.text('Failed to fetch blog', 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.post('/', async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();

    const { success, error } = createBlogInput.safeParse(body);
    if (!success) {
      console.error('Invalid input:', error.errors);
      return c.json({ message: "Invalid input", errors: error.errors }, 400);
    }

    if (!body.email) {
      return c.text('Missing author email', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return c.text('Author not found', 404);
    }

    const published = body.published === true || body.published === 'true';

    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content || '',
        published,
        author: { connect: { id: user.id } },
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

blogRoutes.put('/', async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();

    const { success, error } = updateBlogInput.safeParse(body);
    if (!success) {
      console.error('Invalid input:', error.errors);
      return c.json({ message: "Invalid input", errors: error.errors }, 400);
    }

    const published = body.published === true || body.published === 'true';

    const updatedPost = await prisma.post.update({
      where: { id: body.id },
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

blogRoutes.onError(async (err, c) => {
  console.error('Unhandled error:', err);
  return c.text('Internal Server Error', 500);
});

export default blogRoutes;
