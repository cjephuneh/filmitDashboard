'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Mail, Phone } from 'lucide-react'

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Director", project: "Neon Nights", email: "alice@example.com", phone: "+1 (555) 123-4567", availability: "Available" },
  { id: 2, name: "Bob Smith", role: "Cinematographer", project: "Whispers in the Wind", email: "bob@example.com", phone: "+1 (555) 234-5678", availability: "On Set" },
  { id: 3, name: "Charlie Brown", role: "Sound Designer", project: "Quantum Leap", email: "charlie@example.com", phone: "+1 (555) 345-6789", availability: "In Post" },
  { id: 4, name: "Diana Ross", role: "Editor", project: "Echoes of Yesterday", email: "diana@example.com", phone: "+1 (555) 456-7890", availability: "Available" },
  { id: 5, name: "Ethan Hunt", role: "VFX Supervisor", project: "Midnight Serenade", email: "ethan@example.com", phone: "+1 (555) 567-8901", availability: "On Set" },
]

export default function Team() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)

  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team</h1>
        <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Add a new member to your film production team</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Input id="role" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">Project</Label>
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
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" type="tel" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAddMemberDialogOpen(false)}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeamMembers.map(member => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${member.name[0]}`} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Project:</span>
                  <Badge variant="outline">{member.project}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Availability:</span>
                  <Badge variant={member.availability === 'Available' ? 'default' : 'secondary'}>
                    {member.availability}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}