import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm"
import { createExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/api"

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpensePage
})

function CreateExpensePage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const defaultValues = {
    date: new Date().toISOString(),
    location: "",
    category: "",
    subCategory: "",
    comment: "",
    amount: "0"
  }

  async function handleSubmit(value: any) {
    const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions)
    navigate({ to: "/expenses" })
    queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, { expense: value })

    try {
      const newExpense = await createExpense({ value })
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses]
      })
      toast.success(`Expense "${newExpense.category}" created successfully!`)
    } catch (error) {
      console.error("Validation error:", error)
      toast.error("Failed to create expense. Please try again.")
    } finally {
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {})
    }
  }

  return (
    <div className="p-2">
      <h2 className="mb-4">Create expense</h2>
      <ExpenseForm defaultValues={defaultValues} onSubmit={handleSubmit} submitLabel="Create Expense" />
    </div>
  )
}
