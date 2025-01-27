'use client'

import { useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker" // Ensure this component is correctly implemented
import { Checkbox } from "@/components/ui/checkbox"
import { apiBase } from "@/lib/config"
import toast from 'react-hot-toast' // Import react-hot-toast

export default function CreateBid() {
  const [projectTitle, setProjectTitle] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [filmingLocation, setFilmingLocation] = useState('')
  const [estimatedDurationWeeks, setEstimatedDurationWeeks] = useState<number | ''>('')
  const [requiredRoles, setRequiredRoles] = useState<{ role: string; quantity: number; requirements: string }[]>([])
  const [bidDeadline, setBidDeadline] = useState<Date>()
  const [additionalRequirements, setAdditionalRequirements] = useState('')

  const handleSubmit = async () => {
    // Validate required fields
    if (!bidDeadline || !estimatedDurationWeeks) {
      toast.error("Bid deadline and estimated duration are required.")
      return
    }

    const bidData = {
      projectTitle,
      description,
      genre,
      filmingLocation,
      estimatedDuration: {
        weeks: estimatedDurationWeeks,
        startDate: bidDeadline.toISOString().split('T')[0], // Assuming start date is the bid deadline
        endDate: new Date(new Date(bidDeadline).setDate(bidDeadline.getDate() + estimatedDurationWeeks * 7)).toISOString().split('T')[0]
      },
      requiredRoles,
      bidDeadline: bidDeadline.toISOString().split('T')[0],
      additionalRequirements
    }

    try {
      const response = await axios.post(`${apiBase}/api/producerbids`, bidData)
      console.log('Bid created successfully:', response.data)
      toast.success('Bid created successfully!') // Show success toast
    } catch (error) {
      console.error('Failed to create bid:', error)
      toast.error('Failed to create bid. Please try again.') // Show error toast
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create a Bid</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Project Bid</CardTitle>
          <CardDescription>Create a new bid for your upcoming film project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-title">Project Title</Label>
            <Input id="project-title" placeholder="Enter project title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea id="project-description" placeholder="Describe your project" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-genre">Genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="project-genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-budget">Estimated Budget</Label>
              <Input id="project-budget" type="number" placeholder="Enter budget" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-location">Filming Location</Label>
              <Input id="project-location" placeholder="Enter location" value={filmingLocation} onChange={(e) => setFilmingLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-duration">Estimated Duration (weeks)</Label>
              <Input id="project-duration" type="number" placeholder="Enter duration" value={estimatedDurationWeeks} onChange={(e) => setEstimatedDurationWeeks(Number(e.target.value))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Required Roles</Label>
            <div className="grid grid-cols-2 gap-2">
              {['Director', 'Cinematographer', 'Sound Designer', 'Editor', 'VFX Artist', 'Production Designer'].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox id={`role-${role.toLowerCase()}`} />
                  <Label htmlFor={`role-${role.toLowerCase()}`}>{role}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Bid Deadline</Label>
            <DatePicker date={bidDeadline} setDate={setBidDeadline} /> {/* Use the DatePicker component */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional-requirements">Additional Requirements</Label>
            <Textarea id="additional-requirements" placeholder="Any other specific requirements or information" value={additionalRequirements} onChange={(e) => setAdditionalRequirements(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>Create Bid</Button>
        </CardFooter>
      </Card>
    </div>
  )
}