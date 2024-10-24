'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Film, Search, Plus, Calendar, Users, DollarSign } from 'lucide-react'

// Mock data for projects
const mockProjects = [
  { id: 1, title: "The Last Frontier", status: "In Progress", dueDate: "2024-12-31", budget: 5000000, team: 50 },
  { id: 2, title: "Echoes of Tomorrow", status: "Planning", dueDate: "2025-06-30", budget: 3000000, team: 30 },
  { id: 3, title: "Whispers in the Wind", status: "Completed", dueDate: "2024-03-15", budget: 1000000, team: 20 },
  { id: 4, title: "Neon Nights", status: "In Progress", dueDate: "2024-09-30", budget: 4000000, team: 40 },
  { id: 5, title: "Sands of Time", status: "Planning", dueDate: "2025-02-28", budget: 6000000, team: 60 },
  { id: 6, title: "Starfall", status: "In Progress", dueDate: "2024-11-15", budget: 8000000, team: 75 },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [newProject, setNewProject] = useState({ title: "", status: "", dueDate: "", budget: "", team: "" })

  const filteredProjects = mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || project.status === statusFilter)
  )

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new project data to your backend
    console.log("Creating new project:", newProject)
    // Reset the form
    setNewProject({ title: "", status: "", dueDate: "", budget: "", team: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Film Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter the details for your new film project here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateProject}>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    onValueChange={(value) => setNewProject({...newProject, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget" className="text-right">
                    Budget ($)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">
                    Team Size
                  </Label>
                  <Input
                    id="team"
                    type="number"
                    value={newProject.team}
                    onChange={(e) => setNewProject({...newProject, team: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Film className="mr-2" />
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status: {project.status}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="text-sm">Due: {project.dueDate}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span className="text-sm">Budget: ${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span className="text-sm">Team: {project.team} members</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="mx-2">Previous</Button>
        <Button variant="outline" className="mx-2">Next</Button>
      </div>
    </div>
  )
}