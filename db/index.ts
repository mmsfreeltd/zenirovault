// @/db/index.ts
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http"; //for online pg neon db
// import { drizzle } from "drizzle-orm/node-postgres"; // for local pg db

export const db = drizzle(process.env.DATABASE_URL!, { schema });
