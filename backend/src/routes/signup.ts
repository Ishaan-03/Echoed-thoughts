import { Hono } from 'hono'

const signuproute = new Hono()

signuproute.post('/', (c) => {
  return c.text('signup route')
})

export default signuproute;