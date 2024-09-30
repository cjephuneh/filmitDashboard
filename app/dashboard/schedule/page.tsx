'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin } from 'lucide-react'

const events = [
  { id: 1, title: "Location Scouting", project: "Neon Nights", date: "2024-07-15", time: "09:00 AM", location: "Downtown", description: "Explore potential filming locations" },
  { id: 2, title: "Casting Call", project: "Whispers in the Wind", date: "2024-07-18", time: "10:00 AM", location: "Studio A", description: "Auditions for supporting roles" },
  { id: 3, title: "Production Meeting", project: "Quantum Leap", date: "2024-07-20", time: "02:00 PM", location: "Conference Room", description: "Weekly team sync" },
  { id: 4, title: "Costume Fitting", project: "Echoes of Yesterday", date: "2024-07-22", time: "11:00 AM", location: "Wardrobe Department", description: "Final fittings for lead actors" },
  { id: 5, title: "Tech Rehearsal", project: "Midnight Serenade", date: "2024-07-25", time: "03:00 PM", location: "Main Stage", description: "Sound and lighting check" },
]

export default function Schedule() {
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)

  const filteredEvents = events.filter(event => 
    selectedProject === "all" || event.project === selectedProject
  )

  const selectedDateEvents = filteredEvents.filter(event => 
    event.date === selectedDate?.toISOString().split('T')[0]
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <div className="flex space-x-4">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="Neon Nights">Neon Nights</SelectItem>
              <SelectItem value="Whispers in the Wind">Whispers in the Wind</SelectItem>
              <SelectItem value="Quantum Leap">Quantum Leap</SelectItem>
              <SelectItem value="Echoes of Yesterday">Echoes of Yesterday</SelectItem>
              <SelectItem value="Midnight Serenade">Midnight Serenade</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Schedule a new event for your project</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-title" className="text-right">Title</Label>
                  <Input id="event-title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-project" className="text-right">Project</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neon-nights">Neon Nights</SelectItem>
                      <SelectItem value="whispers-in-the-wind">Whispers in the Wind</SelectItem>
                      <SelectItem value="quantum-leap">Quantum Leap</SelectItem>
                      <SelectItem value="echoes-of-yesterday">Echoes of Yesterday</SelectItem>
                      <SelectItem value="midnight-serenade">Midnight Serenade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-date" className="text-right">Date</Label>
                  <Input id="event-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-time" className="text-right">Time</Label>
                  <Input id="event-time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-location" className="text-right">Location</Label>
                  <Input id="event-location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-description" className="text-right">Description</Label>
                  <Textarea id="event-description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsAddEventDialogOpen(false)}>Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Events for {selectedDate?.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">{event.project}</Badge>
                          <Clock className="h-4 w-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No events scheduled for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}