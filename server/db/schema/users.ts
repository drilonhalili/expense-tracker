import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  created_at: timestamp().defaultNow().notNull()
})

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  name: z.string().min(2)
})
