import { Hono } from 'hono'
import { serve } from '@hono/node-server'


const app = new Hono()


app.post('/api/v1/user/signup', (c) => {
  return c.text('sign up')
})
app.post('/api/v1/user/signin', (c) => {
  return c.text('sign in')
})
app.post('/api/v1/blog', (c) => {
  return c.text('post blog')
})
app.put('/api/v1/blog', (c) => {
  return c.text('update blog')
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text('get blog route')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('search blog')
})




export default app;

