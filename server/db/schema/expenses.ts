import {
  serial,
  text,
  pgTable,
  timestamp,
  numeric,
  index,
  date
} from "drizzle-orm/pg-core"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("date").notNull(),
    created_at: timestamp().defaultNow().notNull()
  },
  expenses => {
    return {
      userIdIndex: index("user_id_index").on(expenses.userId!)
    }
  }
)

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {message: "Amount must be a valid monetary value"})
});
// Schema for selecting a Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
