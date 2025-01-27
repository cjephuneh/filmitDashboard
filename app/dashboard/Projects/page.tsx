'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Film, Search, Plus, Calendar, Users, DollarSign, Edit, Trash } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'

interface Project {
  id: number
  title: string
  status: 'Planning' | 'In Progress' | 'Completed'
  dueDate: string
  budget: number
  team: number
}

interface FormData {
  title: string
  status: string
  dueDate: string
  budget: string
  team: string
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [projects, setProjects] = useState<Project[]>([])
  const [formData, setFormData] = useState<FormData>({ 
    title: "", status: "", dueDate: "", budget: "", team: "" 
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const url = isEditMode 
        ? `${process.env.NEXT_PUBLIC_API_URL}/projects/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/projects`
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget),
          team: Number(formData.team)
        })
      })

      if (!response.ok) throw new Error(isEditMode ? 'Failed to update project' : 'Failed to create project')
      
      toast.success(isEditMode ? 'Project updated successfully' : 'Project created successfully')
      resetForm()
      fetchProjects()
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update project' : 'Failed to create project')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to delete project')
      toast.success('Project deleted successfully')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (project: Project): void => {
    setFormData({
      title: project.title,
      status: project.status,
      dueDate: project.dueDate,
      budget: project.budget.toString(),
      team: project.team.toString()
    })
    setEditingId(project.id)
    setIsEditMode(true)
  }

  const resetForm = (): void => {
    setFormData({ title: "", status: "", dueDate: "", budget: "", team: "" })
    setIsEditMode(false)
    setEditingId(null)
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "All" || project.status === statusFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Film Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> {isEditMode ? 'Edit Project' : 'Create New Project'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Project' : 'Create New Project'}</DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Edit project details below.' : 'Enter the details for your new film project here.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({...formData, status: value})}
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
                  <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget" className="text-right">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">Team Size</Label>
                  <Input
                    id="team"
                    type="number"
                    value={formData.team}
                    onChange={(e) => setFormData({...formData, team: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Create Project'}
                </Button>
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
        <Select onValueChange={setStatusFilter} defaultValue="All">
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
              <p className="text-sm text-gray-500">Status: {project.status}</p>
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
            <CardFooter className="flex justify-between space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleEdit(project)}
                disabled={isLoading}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleDelete(project.id)}
                disabled={isLoading}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}