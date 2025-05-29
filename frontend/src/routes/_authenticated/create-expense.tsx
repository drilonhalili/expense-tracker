import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import { api } from "@/lib/api"
import { createExpenseSchema } from "../../../../server/sharedTypes"
import { Calendar } from "@/components/ui/calendar"
import { date } from "drizzle-orm/mysql-core"


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
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString()
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      // await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate a delay
      await api.expenses.$post({
        json: value
      })
      if (!value) {
        throw new Error("Failed to create expense")
      }
      navigate({ to: "/expenses" })
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
                className="rounded-md border"
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
