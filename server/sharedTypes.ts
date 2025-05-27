import { insertExpensesSchema } from "./db/schema/expenses"

export const expenseSchema = insertExpensesSchema.omit({
  userId: true,
  created_at: true,
})

export const createExpenseSchema = expenseSchema.omit({ id: true })
