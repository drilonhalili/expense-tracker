import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm"
import { updateExpense, getAllExpensesQueryOptions } from "@/lib/api"

export function EditExpenseForm({
  expense,
  onSuccess
}: {
  expense: any
  onSuccess: () => void
}) {
  const queryClient = useQueryClient()

  async function handleSubmit(value: any) {
    try {
      await updateExpense({ id: expense.id, value })
      await queryClient.invalidateQueries({ queryKey: getAllExpensesQueryOptions.queryKey })
      toast.success("Expense updated!")
      onSuccess()
    } catch (error) {
      toast.error("Failed to update expense.")
    }
  }

  return (
    <ExpenseForm
      defaultValues={{
        date: expense.date,
        location: expense.location,
        category: expense.category,
        amount: expense.amount
      }}
      onSubmit={handleSubmit}
      submitLabel="Update Expense"
    />
  )
}
