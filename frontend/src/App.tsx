import { useState, useEffect } from "react"
import './App.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { api } from "@/lib/api"

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    const fetchTotalSpent = async () => {
      try {
        const response = await api.expenses["total-spent"].$get()
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setTotalSpent(data.total)
      } catch (error) {
        console.error('Error fetching total spent:', error)
      }
    }
    fetchTotalSpent()
  }, [])

  return (
    <Card className="w-[350px] m-auto mt-10">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  )
}

export default App
