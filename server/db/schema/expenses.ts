import {
  serial,
  text,
  pgTable,
  timestamp,
  numeric,
  index,
  date
} from "drizzle-orm/pg-core"

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    created_at: timestamp().defaultNow().notNull()
  },
  expenses => {
    return {
      userIdIndex: index("user_id_index").on(expenses.userId)
    }
  }
)
