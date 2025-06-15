import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import { createExpenseSchema } from "../../../../server/sharedTypes"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const locationOptions = [
  { value: "butel", label: "Butel" },
  { value: "kisella-voda", label: "Kisella Voda" },
  { value: "chair", label: "Chair" },
  { value: "stadion", label: "Stadion" },
  { value: "emka", label: "Emka" }
]

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

export function ExpenseForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Expense",
  isSubmitting = false
}: {
  defaultValues: any
  onSubmit: (value: any) => Promise<void>
  submitLabel?: string
  isSubmitting?: boolean
}) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-2"
    >
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

      <form.Field
        name="location"
        validators={{
          onChange: ({ value }) => {
            const result = createExpenseSchema.shape.location.safeParse(value)
            return result.success
              ? undefined
              : result.error.errors.map(e => e.message).join(", ")
          }
        }}
        children={field => (
          <div>
            <Label htmlFor={field.name}>Location</Label>
            <select
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="">Select location</option>
              {locationOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name="category"
        validators={{
          onChange: ({ value }) => {
            const result = createExpenseSchema.shape.category.safeParse(value)
            return result.success
              ? undefined
              : result.error.errors.map(e => e.message).join(", ")
          }
        }}
        children={field => (
          <div>
            <Label htmlFor={field.name}>Category</Label>
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
        name="subCategory"
        children={field => (
          <div>
            <Label htmlFor={field.name}>Subcategory</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="Enter subcategory"
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name="comment"
        children={field => (
          <div>
            <Label htmlFor={field.name}>Comment</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="Add a comment"
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

      <form.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isFormSubmitting]) => (
          <Button className="mt-4" type="submit" disabled={!canSubmit || isSubmitting || isFormSubmitting}>
            {isSubmitting || isFormSubmitting ? "..." : submitLabel}
          </Button>
        )}
      />
    </form>
  )
}
