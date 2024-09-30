'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { DollarSign, PieChart, TrendingUp, AlertTriangle } from 'lucide-react'

const budgetItems = [
  { id: 1, category: "Pre-production", item: "Script Development", allocated: 50000, spent: 45000 },
  { id: 2, category: "Production", item: "Camera Equipment", allocated: 100000, spent: 98000 },
  { id: 3, category: "Production", item: "Cast Salaries", allocated: 500000, spent: 480000 },
  { id: 4, category: "Production", item: "Location Fees", allocated: 75000, spent: 80000 },
  { id: 5, category: "Post-production", item: "Editing", allocated: 80000, spent: 60000 },
  { id: 6, category: "Post-production", item: "Visual Effects", allocated: 200000, spent: 180000 },
  { id: 7, category: "Marketing", item: "Advertising", allocated: 150000, spent: 100000 },
]

export default function Budget() {
  const [selectedProject, setSelectedProject] = useState("neon-nights")
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false)

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0)
  const remainingBudget = totalBudget - totalSpent

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget</h1>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neon-nights">Neon Nights</SelectItem>
            <SelectItem value="whispers-in-the-wind">Whispers in the Wind</SelectItem>
            <SelectItem value="quantum-leap">Quantum Leap</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of total budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${remainingBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((remainingBudget / totalBudget) * 100).toFixed(1)}% of total budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Health</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <Progress value={(remainingBudget / totalBudget) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Budget Breakdown</CardTitle>
            <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add Expense</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>Add a new expense to your project budget</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expense-category" className="text-right">Category</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-production">Pre-production</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="post-production">Post-production</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expense-item" className="text-right">Item</Label>
                    <Input id="expense-item" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expense-amount" className="text-right">Amount</Label>
                    <Input id="expense-amount" type="number" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsAddExpenseDialogOpen(false)}>Add Expense</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>${item.allocated.toLocaleString()}</TableCell>
                  <TableCell>${item.spent.toLocaleString()}</TableCell>
                  <TableCell>${(item.allocated - item.spent).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}