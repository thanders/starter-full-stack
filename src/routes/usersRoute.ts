import { Hono } from 'hono'
import { HTTPException } from "hono/http-exception";
import { db, } from "../../db/db.ts";
import { z } from "zod";
import { gt, eq } from "drizzle-orm";
import { users } from "../../db/schema.ts";


const usersRoute = new Hono();

const schema = z.object({
  id: z.string().transform(Number).pipe(
    z.number().int().positive()
  )
});

// GET /api/users/
usersRoute.get('/', async (c) => {
  const data = await db.select().from(users); 
  return c.json({ success: true, data });
});

const cursorSchema = z.object({
  cursor: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(
      z.number().int().positive()
    )
    .optional(),

  limit: z
    .string()
    .optional()
    .transform((v) => Number(v) || 10)
    .pipe(z.number().int().positive().max(100)),
});


usersRoute.get("/feed", async (c) => {
  const limit = Number(c.req.query("limit")) || 10;
  const cursor = Number(c.req.query("cursor"));

  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(cursor ? gt(users.id, cursor) : undefined)
    .limit(limit)
    .orderBy(users.id);

  return c.json({
    success: true,
    data: result,
    nextCursor: result.length === limit ? result[result.length - 1].id : null,
  });
});

// GET /api/users/:id
usersRoute.get("/:id", async (c) => {
  const result = schema.safeParse({ id: c.req.param("id") });

  if (!result.success) {
    throw new HTTPException(400, { message: "ID must be a positive integer" });
  }

  const { id } = result.data;

  const results = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  const user = results[0];

  if (!user) {
    return c.json({ success: false, message: "User not found" }, 404);
  }

  return c.json({ success: true, data: user });
});

export default usersRoute;