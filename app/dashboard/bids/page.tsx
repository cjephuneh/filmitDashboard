'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star } from 'lucide-react'

const bids = [
  { id: 1, project: "Neon Nights", role: "Cinematographer", bidder: "Alex Johnson", amount: "$50,000", rating: 4.8, status: "Pending" },
  { id: 2, project: "Whispers in the Wind", role: "Sound Designer", bidder: "Emma Thompson", amount: "$30,000", rating: 4.9, status: "Accepted" },
  { id: 3, project: "Quantum Leap", role: "VFX Supervisor", bidder: "Michael Chen", amount: "$100,000", rating: 4.7, status: "Rejected" },
  { id: 4, project: "Echoes of Yesterday", role: "Editor", bidder: "Sarah Lee", amount: "$40,000", rating: 4.6, status: "Pending" },
  { id: 5, project: "Midnight Serenade", role: "Composer", bidder: "David Miller", amount: "$25,000", rating: 4.5, status: "Pending" },
]

export default function Bids() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [activeTab, setActiveTab] = useState('all')

  const filteredBids = bids.filter(bid => 
    (bid.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
     bid.bidder.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || bid.status === statusFilter) &&
    (activeTab === 'all' || (activeTab === 'pending' && bid.status === 'Pending'))
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bids</h1>
      
      <div className="flex space-x-4 mb-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bids..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bids</TabsTrigger>
          <TabsTrigger value="pending">Pending Bids</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBids.map(bid => (
          <Card key={bid.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{bid.project}</CardTitle>
                <Badge variant={bid.status === 'Accepted' ? 'default' : (bid.status === 'Rejected' ? 'destructive' : 'secondary')}>
                  {bid.status}
                </Badge>
              </div>
              <CardDescription>{bid.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${bid.bidder[0]}`} />
                  <AvatarFallback>{bid.bidder[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{bid.bidder}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{bid.rating}</span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm font-medium">{bid.amount}</p>
                  <p className="text-xs text-muted-foreground">Bid Amount</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}