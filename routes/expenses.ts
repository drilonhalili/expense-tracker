import { Hono } from "hono"
import { z } from "zod"

type Expense = {
  id: number
  title: string
  amount: number
}

const createPostSchema = z.object({
  title: z.string().min(1),
  amount: z.number().min(0),
})

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 100 },
  { id: 2, title: "Rent", amount: 1200 },
  { id: 3, title: "Utilities", amount: 300 }
]

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    })
  })
  .post("/", async (c) => {
    const data = await c.req.json()
    const expense = createPostSchema.parse(data)
  },)
  // .delete
  // .put
