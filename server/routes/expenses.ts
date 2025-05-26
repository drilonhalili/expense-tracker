import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

import { getUser } from "../kinde"

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive()
})

type Expense = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({ id: true })

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 100 },
  { id: 2, title: "Rent", amount: 1200 },
  { id: 3, title: "Utilities", amount: 300 }
]

export const expensesRoute = new Hono()
  .get("/", getUser, async c => {
    const user = c.var.user
    // await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate a delay
    return c.json({ expenses: fakeExpenses })
  })
  .post("/", getUser, zValidator("json", createPostSchema), async c => {
    const expense = await c.req.valid("json")
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
    c.status(201)
    return c.json(expense)
  })
  .get("/total-spent", getUser, async c => {
    // await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate a delay
    const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
    return c.json({ total })
  })
  .get("/:id{[0-9]+}", getUser, async c => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.findIndex(expense => expense.id === id)
    if (!expense) {
      return c.notFound("Expense not found")
    }
    return c.json(expense)
  })
  .delete("/:id{[0-9]+}", getUser, async c => {
    const id = Number.parseInt(c.req.param("id"))
    const index = fakeExpenses.findIndex(expense => expense.id === id)
    if (index === -1) {
      return c.notFound("Expense not found")
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0]
    return c.json({ expense: deletedExpense })
  })
  // .put
