import { deleteExpense, getAllExpensesQueryOptions } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { Trash } from "lucide-react"

export function ExpenseDeleteButton({ id, onDeleted }: { id: number; onDeleted?: () => void }) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteExpense({ id }),
    onError: () => {
      toast.error("Failed to delete expense")
    },
    onSuccess: (_, variables) => {
      toast.success("Expense deleted successfully")
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses: any) => ({
          ...existingExpenses,
          expenses: existingExpenses?.expenses?.filter(
            (expense: any) => expense.id !== variables.id
          ) ?? []
        })
      )
      onDeleted?.()
    }
  })

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => mutation.mutate({ id })}
      disabled={mutation.isPending}
      aria-label="Delete expense"
    >
      {mutation.isPending ? (
        <Skeleton className="w-4 h-4" />
      ) : (
        <Trash className="size-4 text-red-500" />
      )}
    </Button>
  )
}
