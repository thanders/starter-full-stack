import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { ensureDirSync } from "@std/fs";
import * as schema from "./schema.ts";

// Ensure the data directory exists for the sqlite file
ensureDirSync("data");

/**
 * We use the @libsql/client because it is the native 
 * way to handle local SQLite files in Deno without 
 * the "empty object" mapping bugs of the proxy driver.
 */
const client = createClient({ 
  url: "file:data/local.db" 
});

export const db = drizzle(client, { schema });

/**
 * Fetch all users. 
 * Note: Drizzle with LibSQL is asynchronous.
 */
export async function getUsers() {
  return await db.select().from(schema.users);
}

/**
 * Optional: Close the client connection manually if needed
 */
export function closeDb() {
  client.close();
}