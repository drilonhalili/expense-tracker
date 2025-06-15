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
    date: date("date").notNull(),
    location: text("location").notNull(),
    category: text("title").notNull(),
    subCategory: text("sub_category"), // <-- NEW
    comment: text("comment"),          // <-- NEW
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
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
  location: z.enum([
    "butel",
    "kisella-voda",
    "chair",
    "stadion",
    "emka"
  ], { message: "Invalid location" }),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" }),
  subCategory: z.string().optional(), // <-- NEW
  comment: z.string().max(255).optional(), // <-- NEW
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {message: "Amount must be a valid monetary value"})
});

// Schema for selecting a Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
