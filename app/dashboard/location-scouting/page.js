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
import { MapPin, Search, Plus, Camera, DollarSign, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react'

// Mock data for locations
const mockLocations = [
  { id: 1, name: "Sunset Beach", category: "Outdoor", address: "123 Coastal Hwy, Beachtown, CA", cost: 1000, availability: "2024-06-01", pros: "Beautiful sunsets, wide open spaces", cons: "Limited parking, weather dependent", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop" },
  { id: 2, name: "Downtown Loft", category: "Indoor", address: "456 Main St, Metropolis, NY", cost: 1500, availability: "2024-05-15", pros: "Modern interior, great natural light", cons: "Noise from street, limited space", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=500&fit=crop" },
  { id: 3, name: "Abandoned Warehouse", category: "Indoor", address: "789 Industrial Ave, Rustville, MI", cost: 800, availability: "2024-07-01", pros: "Gritty atmosphere, lots of space", cons: "Needs cleaning, potential safety issues", imageUrl: "https://images.unsplash.com/photo-1581331474665-a0bbee7dfba9?w=500&h=500&fit=crop" },
  { id: 4, name: "Mountain Vista", category: "Outdoor", address: "321 Peak Rd, Hightown, CO", cost: 2000, availability: "2024-08-15", pros: "Breathtaking views, unique landscape", cons: "Difficult access, altitude challenges", imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&h=500&fit=crop" },
  { id: 5, name: "Historic Theater", category: "Indoor", address: "159 Broadway, Oldtown, MA", cost: 3000, availability: "2024-09-01", pros: "Classic architecture, built-in seating", cons: "Strict preservation rules, limited modernization", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&h=500&fit=crop" },
  { id: 6, name: "City Park", category: "Outdoor", address: "753 Green St, Metropolis, NY", cost: 500, availability: "2024-05-30", pros: "Versatile spaces, natural scenery", cons: "Public access, permit required", imageUrl: "https://images.unsplash.com/photo-1494005612480-90f50fd9376f?w=500&h=500&fit=crop" },
]

export default function LocationScoutingPage() {
  const [locations, setLocations] = useState(mockLocations)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [newLocation, setNewLocation] = useState({
    name: "", category: "", address: "", cost: "", availability: "", pros: "", cons: "", imageUrl: ""
  })
  const [selectedLocation, setSelectedLocation] = useState(null)

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === "All" || location.category === categoryFilter)
  )

  const handleCreateLocation = (e) => {
    e.preventDefault()
    const createdLocation = {
      ...newLocation,
      id: locations.length + 1,
      cost: parseFloat(newLocation.cost)
    }
    setLocations([...locations, createdLocation])
    setNewLocation({ name: "", category: "", address: "", cost: "", availability: "", pros: "", cons: "", imageUrl: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Location Scouting</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>
                Enter the details for the new filming location here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateLocation}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => setNewLocation({...newLocation, category: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indoor">Indoor</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cost" className="text-right">
                    Cost ($)
                  </Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newLocation.cost}
                    onChange={(e) => setNewLocation({...newLocation, cost: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="availability" className="text-right">
                    Availability
                  </Label>
                  <Input
                    id="availability"
                    type="date"
                    value={newLocation.availability}
                    onChange={(e) => setNewLocation({...newLocation, availability: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pros" className="text-right">
                    Pros
                  </Label>
                  <Textarea
                    id="pros"
                    value={newLocation.pros}
                    onChange={(e) => setNewLocation({...newLocation, pros: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cons" className="text-right">
                    Cons
                  </Label>
                  <Textarea
                    id="cons"
                    value={newLocation.cons}
                    onChange={(e) => setNewLocation({...newLocation, cons: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={newLocation.imageUrl}
                    onChange={(e) => setNewLocation({...newLocation, imageUrl: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Location</Button>
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
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Indoor">Indoor</SelectItem>
            <SelectItem value="Outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <Image
              src={location.imageUrl}
              alt={location.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" />
                {location.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">{location.category}</p>
              <p className="text-sm mt-2">{location.address}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span className="text-sm">Cost: ${location.cost}/day</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="text-sm">Available from: {location.availability}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setSelectedLocation(location)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>{selectedLocation.name}</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image
                  src={selectedLocation.imageUrl}
                  alt={selectedLocation.name}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="font-semibold">Address:</h3>
                  <p>{selectedLocation.address}</p>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold">Category:</h3>
                  <p>{selectedLocation.category}</p>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold">Cost:</h3>
                  <p>${selectedLocation.cost}/day</p>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold">Availability:</h3>
                  <p>From {selectedLocation.availability}</p>
                </div>
              </div>
              <div>
                <Tabs defaultValue="pros">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pros">Pros</TabsTrigger>
                    <TabsTrigger value="cons">Cons</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pros">
                    <Card>
                      <CardHeader>
                        <CardTitle>Pros</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5">
                          {selectedLocation.pros.split(', ').map((pro, index) => (
                            <li key={index} className="text-green-600 dark:text-green-400">
                              <ThumbsUp className="inline mr-2 h-4 w-4" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="cons">
                    <Card>
                      <CardHeader>
                        <CardTitle>Cons</CardTitle>
                
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5">
                          {selectedLocation.cons.split(', ').map((con, index) => (
                            <li key={index} className="text-red-600 dark:text-red-400">
                              <ThumbsDown className="inline mr-2 h-4 w-4" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="mt-4">
                  <Button className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Upload More Photos
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