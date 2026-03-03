import { db, closeDb } from "./db.ts"; // Import 'db' (Drizzle) and 'sqlite' (Raw)
import { users } from "./schema.ts"; 
import { faker } from "@faker-js/faker";
import { InferInsertModel } from "drizzle-orm";

type NewUser = InferInsertModel<typeof users>;

export async function seed() {
  console.log("🌱 Starting seed...");

  const usersToCreate = 50;
  const mockUsers: NewUser[] = [];

  for (let i = 0; i < usersToCreate; i++) {
    mockUsers.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
    });
  }

  await db.transaction(async (tx) => {
    await tx.insert(users).values(mockUsers);
  });

  console.log(`✅ Seed complete. Created ${usersToCreate} users.`);

  closeDb();
}

if (import.meta.main) {
  seed();
}