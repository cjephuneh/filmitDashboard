'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mic, Lightbulb, Monitor, HardDrive, Search, Plus, Calendar } from 'lucide-react'

const equipmentCategories = [
  { id: 'camera', name: 'Camera', icon: Camera },
  { id: 'audio', name: 'Audio', icon: Mic },
  { id: 'lighting', name: 'Lighting', icon: Lightbulb },
  { id: 'grip', name: 'Grip', icon: Monitor },
  { id: 'storage', name: 'Storage', icon: HardDrive },
]

const equipmentItems = [
  { id: 1, name: 'RED DSMC2 GEMINI', category: 'camera', status: 'Available', condition: 'Excellent', lastMaintenance: '2024-05-15' },
  { id: 2, name: 'ARRI ALEXA Mini LF', category: 'camera', status: 'In Use', condition: 'Good', lastMaintenance: '2024-04-20' },
  { id: 3, name: 'Sennheiser MKH 416', category: 'audio', status: 'Available', condition: 'Fair', lastMaintenance: '2024-06-01' },
  { id: 4, name: 'ARRI SkyPanel S60-C', category: 'lighting', status: 'In Maintenance', condition: 'Poor', lastMaintenance: '2024-06-10' },
  { id: 5, name: 'Matthews C-Stand', category: 'grip', status: 'Available', condition: 'Good', lastMaintenance: '2024-05-05' },
  { id: 6, name: 'G-Technology G-RAID', category: 'storage', status: 'In Use', condition: 'Excellent', lastMaintenance: '2024-05-25' },
]

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isAddEquipmentDialogOpen, setIsAddEquipmentDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('inventory')

  const filteredEquipment = equipmentItems.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'all' || item.category === categoryFilter)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Equipment Management</h1>
        <Dialog open={isAddEquipmentDialogOpen} onOpenChange={setIsAddEquipmentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
              <DialogDescription>Enter the details of the new equipment item</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="equipment-name" className="text-right">Name</Label>
                <Input id="equipment-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="equipment-category" className="text-right">Category</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="equipment-condition" className="text-right">Condition</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="equipment-maintenance" className="text-right">Last Maintenance</Label>
                <Input id="equipment-maintenance" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAddEquipmentDialogOpen(false)}>Add Equipment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>Manage and track all equipment items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search equipment..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {equipmentCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Available' ? 'default' : (item.status === 'In Use' ? 'secondary' : 'destructive')}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.lastMaintenance}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Upcoming and past maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>RED DSMC2 GEMINI</TableCell>
                    <TableCell>Routine Check</TableCell>
                    <TableCell>2024-07-15</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell><Badge>Scheduled</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ARRI SkyPanel S60-C</TableCell>
                    <TableCell>Repair</TableCell>
                    <TableCell>2024-06-10</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell><Badge variant="secondary">In Progress</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sennheiser MKH 416</TableCell>
                    <TableCell>Calibration</TableCell>
                    <TableCell>2024-06-01</TableCell>
                    <TableCell>Mike Johnson</TableCell>
                    <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Bookings</CardTitle>
              <CardDescription>Current and upcoming equipment reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Booked By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>ARRI ALEXA Mini LF</TableCell>
                    <TableCell>Neon Nights</TableCell>
                    <TableCell>2024-07-01</TableCell>
                    <TableCell>2024-07-15</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=AJ" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <span>Alice Johnson</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge>Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>G-Technology G-RAID</TableCell>
                    <TableCell>Quantum Leap</TableCell>
                    <TableCell>2024-07-10</TableCell>
                    <TableCell>2024-08-05</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=BS" />
                          <AvatarFallback>BS</AvatarFallback>
                        </Avatar>
                        <span>Bob Smith</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary">Upcoming</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {equipmentCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{category.name} Equipment</CardTitle>
              <category.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredEquipment.filter(item => item.category === category.id).length}</div>
              <p className="text-xs text-muted-foreground">
                {filteredEquipment.filter(item => item.category === category.id && item.status === 'Available').length} available
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}