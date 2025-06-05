import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { updateExpense, getAllExpensesQueryOptions } from "@/lib/api"
import { createExpenseSchema } from "../../../../server/sharedTypes"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  )
}

export function EditExpenseForm({
  expense,
  onSuccess
}: {
  expense: any
  onSuccess: () => void
}) {
  const queryClient = useQueryClient()
  const form = useForm({
    defaultValues: {
      title: expense.title ?? "",
      amount: String(expense.amount ?? "0"),
      date: expense.date ?? new Date().toISOString()
    },
    onSubmit: async ({ value }) => {
      try {
        const updatedExpense = await updateExpense({ id: expense.id, value })
        queryClient.setQueryData(
          getAllExpensesQueryOptions.queryKey,
          (existing: any) => ({
            ...existing,
            expenses: existing.expenses.map((e: any) =>
              e.id === expense.id ? updatedExpense : e
            )
          })
        )
        toast.success(`Expense "${updatedExpense.title}" updated successfully!`)
        onSuccess()
      } catch (error) {
        toast.error("Failed to update expense. Please try again.")
      }
    }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-2"
    >
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => {
            const result = createExpenseSchema.shape.title.safeParse(value)
            return result.success
              ? undefined
              : result.error.errors.map(e => e.message).join(", ")
          }
        }}
        children={field => (
          <div>
            <Label htmlFor={field.name}>Title</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name="amount"
        validators={{
          onChange: ({ value }) => {
            const result = createExpenseSchema.shape.amount.safeParse(value)
            return result.success
              ? undefined
              : result.error.errors.map(e => e.message).join(", ")
          }
        }}
        children={field => (
          <div>
            <Label htmlFor={field.name}>Amount</Label>
            <Input
              id={field.name}
              name={field.name}
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name="date"
        validators={{
          onChange: ({ value }) => {
            const result = createExpenseSchema.shape.date.safeParse(value)
            return result.success
              ? undefined
              : result.error.errors.map(e => e.message).join(", ")
          }
        }}
        children={field => (
          <div>
            <Label htmlFor={field.name}>Date</Label>
            <Calendar
              mode="single"
              selected={new Date(field.state.value)}
              onSelect={date => {
                if (date) {
                  field.handleChange(date.toISOString())
                }
                return new Date(field.state.value)
              }}
              className="border rounded-md"
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button className="mt-4" type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Save Changes"}
          </Button>
        )}
      />
    </form>
  )
}
