'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Film, BarChart, Users, DollarSign, Calendar, Settings, Menu, Bell, Search, FileText, Briefcase, MessageSquare, Star, Clapperboard, LocateIcon } from 'lucide-react'

const sidebarItems = [
  { icon: BarChart, label: 'Dashboard', href: '/dashboard' },
  { icon: Film, label: 'Projects', href: '/dashboard/Projects' },
  { icon: FileText, label: 'Bids', href: '/dashboard/bids' },
  { icon: Briefcase, label: 'Create Bid', href: '/dashboard/create-bid' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  { icon: DollarSign, label: 'Budget', href: '/dashboard/budget' },
  { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
  { icon: Star, label: 'Talent Pool', href: '/dashboard/talent-pool' },
  { icon: Clapperboard, label: 'Equipment', href: '/dashboard/equipment' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: LocateIcon, label: 'locations', href: '/dashboard/location-scouting' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="text-xl font-bold">FilmCollab</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100",
                pathname === item.href && "bg-gray-100 text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex-1 flex items-center justify-end space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=SS" alt="Steven Spielberg" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}