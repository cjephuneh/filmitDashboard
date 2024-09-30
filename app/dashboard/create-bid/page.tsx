'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateBid() {
  const [bidDeadline, setBidDeadline] = useState<Date>()

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
            <Input id="project-title" placeholder="Enter project title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea id="project-description" placeholder="Describe your project" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-genre">Genre</Label>
              <Select>
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
              <Input id="project-location" placeholder="Enter location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-duration">Estimated Duration (weeks)</Label>
              <Input id="project-duration" type="number" placeholder="Enter duration" />
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
            <DatePicker date={bidDeadline} setDate={setBidDeadline} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional-requirements">Additional Requirements</Label>
            <Textarea id="additional-requirements" placeholder="Any other specific requirements or information" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Bid</Button>
        </CardFooter>
      </Card>
    </div>
  )
}