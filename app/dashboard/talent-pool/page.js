'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Search, Plus, Camera, Film, Star, Mail,  MapPin, Award } from 'lucide-react'

// Mock data for talent
const mockTalent = [
  { id: 1, name: "Emma Thompson", role: "Actor", skills: ["Drama", "Comedy"], experience: "20+ years", contact: "emma@example.com", location: "Los Angeles, CA", achievements: "2 Academy Awards", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop" },
  { id: 2, name: "Michael Chen", role: "Director", skills: ["Action", "Sci-Fi"], experience: "15 years", contact: "michael@example.com", location: "New York, NY", achievements: "Sundance Film Festival Winner", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop" },
  { id: 3, name: "Sophia Rodriguez", role: "Cinematographer", skills: ["Landscape", "Low-light"], experience: "10 years", contact: "sophia@example.com", location: "Chicago, IL", achievements: "ASC Award Winner", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },
  { id: 4, name: "David Kim", role: "Editor", skills: ["Final Cut Pro", "Adobe Premiere"], experience: "8 years", contact: "david@example.com", location: "San Francisco, CA", achievements: "Emmy Nominee", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
  { id: 5, name: "Olivia Johnson", role: "Production Designer", skills: ["Period Pieces", "Sci-Fi"], experience: "12 years", contact: "olivia@example.com", location: "Atlanta, GA", achievements: "Art Directors Guild Award", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop" },
  { id: 6, name: "Hassan Ali", role: "Sound Designer", skills: ["Foley", "Mixing"], experience: "7 years", contact: "hassan@example.com", location: "Austin, TX", achievements: "BAFTA Nominee", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop" },
]

export default function TalentPoolPage() {
  const [talent, setTalent] = useState(mockTalent)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [newTalent, setNewTalent] = useState({
    name: "", role: "", skills: "", experience: "", contact: "", location: "", achievements: "", imageUrl: ""
  })
  const [selectedTalent, setSelectedTalent] = useState(null)

  const filteredTalent = talent.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === "All" || person.role === roleFilter)
  )

  const handleCreateTalent = (e) => {
    e.preventDefault()
    const createdTalent = {
      ...newTalent,
      id: talent.length + 1,
      skills: newTalent.skills.split(',').map(skill => skill.trim())
    }
    setTalent([...talent, createdTalent])
    setNewTalent({ name: "", role: "", skills: "", experience: "", contact: "", location: "", achievements: "", imageUrl: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Talent Pool</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Talent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Talent</DialogTitle>
              <DialogDescription>
                Enter the details for the new talent here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTalent}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newTalent.name}
                    onChange={(e) => setNewTalent({...newTalent, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select
                    onValueChange={(value) => setNewTalent({...newTalent, role: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actor">Actor</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="Cinematographer">Cinematographer</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Production Designer">Production Designer</SelectItem>
                      <SelectItem value="Sound Designer">Sound Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    value={newTalent.skills}
                    onChange={(e) => setNewTalent({...newTalent, skills: e.target.value})}
                    className="col-span-3"
                    placeholder="Separate skills with commas"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience" className="text-right">
                    Experience
                  </Label>
                  <Input
                    id="experience"
                    value={newTalent.experience}
                    onChange={(e) => setNewTalent({...newTalent, experience: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    value={newTalent.contact}
                    onChange={(e) => setNewTalent({...newTalent, contact: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newTalent.location}
                    onChange={(e) => setNewTalent({...newTalent, location: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="achievements" className="text-right">
                    Achievements
                  </Label>
                  <Textarea
                    id="achievements"
                    value={newTalent.achievements}
                    onChange={(e) => setNewTalent({...newTalent, achievements: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={newTalent.imageUrl}
                    onChange={(e) => setNewTalent({...newTalent, imageUrl: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Talent</Button>
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
            placeholder="Search talent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Actor">Actor</SelectItem>
            <SelectItem value="Director">Director</SelectItem>
            <SelectItem value="Cinematographer">Cinematographer</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Production Designer">Production Designer</SelectItem>
            <SelectItem value="Sound Designer">Sound Designer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalent.map((person) => (
          <Card key={person.id} className="overflow-hidden">
            <Image
              src={person.imageUrl}
              alt={person.name}
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                {person.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge>{person.role}</Badge>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  <span className="text-sm">Experience: {person.experience}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="text-sm">{person.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setSelectedTalent(person)}>
                View Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTalent} onOpenChange={() => setSelectedTalent(null)}>
        <DialogContent className="sm:max-w-[725px] bg-white">
          <DialogHeader>
            <DialogTitle>{selectedTalent?.name}</DialogTitle>
          </DialogHeader>
          {selectedTalent && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image
                  src={selectedTalent.imageUrl}
                  alt={selectedTalent.name}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="font-semibold">Contact:</h3>
                  <p className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    {selectedTalent.contact}
                  </p>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold">Location:</h3>
                  <p className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {selectedTalent.location}
                  </p>
                </div>
              </div>
              <div>
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info">
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p><strong>Role:</strong> {selectedTalent.role}</p>
                        <p><strong>Experience:</strong> {selectedTalent.experience}</p>
                      
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="skills">
                    <Card>
                      <CardHeader>
                        <CardTitle>Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedTalent.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="achievements">
                    <Card>
                      <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="flex items-start">
                          <Award className="mr-2 h-4 w-4 mt-1" />
                          {selectedTalent.achievements}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="mt-4 space-y-2">
                  <Button className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Film className="mr-2 h-4 w-4" />
                    Upload Reel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}