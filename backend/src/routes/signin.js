import { Hono } from 'hono';
const signinroute = new Hono();
signinroute.post('/', (c) => {
    return c.text('signin route');
});
export default signinroute;
