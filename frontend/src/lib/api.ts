import { queryOptions } from "@tanstack/react-query"
import type { ApiRoutes } from "../../../server/app"
import { hc } from "hono/client"
import type { CreateExpense } from "../../../server/sharedTypes"

const client = hc<ApiRoutes>("/")

export const api = client.api

async function getCurrentUser() {
  const res = await api.me.$get()
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await res.json()
  return data
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity
})

export async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await res.json()
  return data
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5 // 5 minutes
})

export async function createExpense({ value }: { value: CreateExpense }) {
  const res = await api.expenses.$post({
    json: value
  })
  if (!res.ok) {
    throw new Error("Failed to create expense")
  }
  const newExpense = await res.json()
  return newExpense
}

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {}
  },
  staleTime: Infinity
})

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: String(id) }
  })

  if (!res.ok) {
    throw new Error("Failed to delete expense")
  }
}

export async function updateExpense({ id, value }: { id: number; value: any }) {
  const res = await api.expenses[":id{[0-9]+}"].$put({
    param: { id: String(id) },
    json: value
  })
  if (!res.ok) {
    throw new Error("Failed to update expense")
  }
  return res.json().then(r => r.expense)
}
