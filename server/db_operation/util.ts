// @/server/db_operation/util.ts
import { db } from "@/db";

export async function getCurrencies() {
  return await db.query.currency.findMany();
}
