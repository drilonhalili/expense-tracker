import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import { createExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/api"
import { createExpenseSchema } from "../../../../server/sharedTypes"
import { Calendar } from "@/components/ui/calendar"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: Expenses
})

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

function Expenses() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString()
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      )

      // Navigate to the expenses page after successful creation
      navigate({ to: "/expenses" })

      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value
      })

      try {
        const newExpense = await createExpense({ value })

        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses]
        })
        toast.success(`Expense "${newExpense.title}" created successfully!`)
      } catch (error) {
        console.error("Validation error:", error)
        toast.error("Failed to create expense. Please try again.")
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {})
      }
    }
  })

  return (
    <div className="p-2">
      <h2 className="mb-4">Create expense</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
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
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
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
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
