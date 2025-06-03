import { deleteExpense, getAllExpensesQueryOptions } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { Trash } from "lucide-react"


export function ExpenseDeleteButton({ id }: { id?: number }) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast.error("Failed to delete expense")
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully")

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        existingExpenses => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter(
            expense => expense.id !== id
          )
        })
      )
    }
  })

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => mutation.mutate({ id: id! })}
      disabled={!id || mutation.isPending}
    >
      {mutation.isPending ? (
        <Skeleton className="w-4 h-4" />
      ) : (
        <Trash className="size-4" />
      )}
    </Button>
  )
}
