import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { D1 } from '@cloudflare/d1';

const app = new Hono();

// Dummy credentials (for demonstration only, not secure for production)
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';

// D1 Database Binding
const d1 = new D1(D1);

app.post('/api/login', async (c) => {
    const { username, password } = await c.req.json();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        c.cookie('auth', 'true', { path: '/', httpOnly: true });
        return c.json({ success: true });
    }
    return c.json({ success: false }, 401);
});

app.use('/api/comments', basicAuth({
    username: VALID_USERNAME,
    password: VALID_PASSWORD,
}));

app.post('/api/comments', async (c) => {
    const { comment } = await c.req.json();
    await d1.prepare('INSERT INTO comments (text) VALUES (?)').bind(comment).run();
    return c.json({ text: comment });
});

app.get('/api/comments', async (c) => {
    const results = await d1.prepare('SELECT text FROM comments').all();
    return c.json(results);
});

export default app;