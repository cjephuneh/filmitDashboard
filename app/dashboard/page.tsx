'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, DollarSign, Film, Users, AlertTriangle, Clapperboard, MessageSquare } from 'lucide-react'

const projectOverview = [
  { id: 1, title: "Neon Nights", progress: 65, status: "In Production" },
  { id: 2, title: "Whispers in the Wind", progress: 30, status: "Pre-production" },
  { id: 3, title: "Quantum Leap", progress: 90, status: "Post-production" },
]

const upcomingDeadlines = [
  { id: 1, task: "Final Script Review", project: "Neon Nights", date: "2024-07-15" },
  { id: 2, task: "Location Scouting", project: "Whispers in the Wind", date: "2024-07-18" },
  { id: 3, task: "VFX Approval", project: "Quantum Leap", date: "2024-07-20" },
]

const teamActivity = [
  { id: 1, name: "Alice Johnson", action: "uploaded new storyboards", project: "Neon Nights", time: "2 hours ago" },
  { id: 2, name: "Bob Smith", action: "commented on the script", project: "Whispers in the Wind", time: "4 hours ago" },
  { id: 3, name: "Charlie Brown", action: "completed sound mixing", project: "Quantum Leap", time: "1 day ago" },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Create New Project</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">+12% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">In the next 2 weeks</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projectOverview.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    <Badge variant={project.status === "In Production" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {upcomingDeadlines.map((deadline) => (
                    <li key={deadline.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{deadline.task}</p>
                        <p className="text-sm text-muted-foreground">{deadline.project}</p>
                      </div>
                      <Badge variant="outline">{deadline.date}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Team Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {teamActivity.map((activity) => (
                    <li key={activity.id} className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${activity.name[0]}`} />
                        <AvatarFallback>{activity.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.name} <span className="text-muted-foreground">{activity.action}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.project}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <BarChart className="h-16 w-16" />
                <span className="ml-4">Project performance charts would be displayed here</span>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="flex-1">Total Budget</span>
                    <span className="font-bold">$2,400,000</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-1">Spent</span>
                    <span className="font-bold">$1,800,000</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-1">Remaining</span>
                    <span className="font-bold text-green-600">$600,000</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Production Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Pre-production</span>
                    <Badge>Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Production</span>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Post-production</span>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>Budget overrun risk</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Schedule delay risk</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    <span>Resource shortage risk</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {['Director', 'Producer', 'Cinematographer', 'Editor', 'Sound Designer', 'VFX Supervisor'].map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${role[0]}`} />
                      <AvatarFallback>{role[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{role}</p>
                      <p className="text-xs text-muted-foreground">Assigned</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Camera Crew', 'Lighting Team', 'Art Department', 'Costume Department'].map((team) => (
                    <div key={team} className="flex items-center justify-between">
                      <span>{team}</span>
                      <Badge variant={Math.random() > 0.5 ? "default" : "secondary"}>
                        {Math.random() > 0.5 ? "Available" : "On Set"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Crew Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Additional Camera Operator</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Stunt Coordinator</span>
                    <Badge variant="outline">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Makeup Artist</span>
                    <Badge variant="outline">Under Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Cameras</span>
                    <Badge>12 Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lighting Kits</span>
                    <Badge>8 Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sound Equipment</span>
                    <Badge>15 Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>City Streets</span>
                    <Badge variant="secondary">Permitted</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Beach Scene</span>
                    <Badge variant="outline">Pending Approval</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Studio Lot</span>
                    <Badge variant="secondary">Reserved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Asset Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clapperboard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Props: 250 items</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Costumes: 100 sets</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Scripts: 5 versions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <BarChart className="h-16 w-16" />
                <span className="ml-4">Resource allocation charts would be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}