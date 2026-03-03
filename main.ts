import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { HTTPException } from "hono/http-exception";
import { exists } from "@std/fs"

const app = new Hono()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse() 
  }

  console.error('Global Exception', err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

// 1. API ROUTES 
app.get('/api/hello', (c) => {
  return c.json({ 
    message: 'Hello Hono backend',
    timestamp: new Date().toISOString() 
  })
})

// 2. SERVE STATIC ASSETS
app.use('/assets/*', serveStatic({ root: './frontend/dist' }))
app.use('/vite.svg', serveStatic({ root: './frontend/dist' }))
app.use('/favicon.ico', serveStatic({ root: './frontend/dist' }))

// 3. THE "SPA" FALLBACK
app.get('*', async (c) => {
  const path = "./frontend/dist/index.html"
  
  if (!(await exists(path))) {
    throw new HTTPException(404, { 
      message: "Frontend not built. Run 'deno task build-fe'." 
    })
  }

  const html = await Deno.readTextFile(path)
  return c.html(html)
})

Deno.serve({ port: 8000 }, app.fetch)