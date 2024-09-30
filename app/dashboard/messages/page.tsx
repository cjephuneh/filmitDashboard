'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Send, PaperclipIcon } from 'lucide-react'

const contacts = [
  { id: 1, name: "Alice Johnson", role: "Director", avatar: "AJ", status: "online" },
  { id: 2, name: "Bob Smith", role: "Cinematographer", avatar: "BS", status: "offline" },
  { id: 3, name: "Charlie Brown", role: "Sound Designer", avatar: "CB", status: "online" },
  { id: 4, name: "Diana Ross", role: "Editor", avatar: "DR", status: "away" },
  { id: 5, name: "Ethan Hunt", role: "VFX Supervisor", avatar: "EH", status: "online" },
]

const messages = [
  { id: 1, senderId: 1, text: "Hey team, how's the progress on the Neon Nights project?", timestamp: "2024-07-10T09:00:00" },
  { id: 2, senderId: 2, text: "We're on track with the cinematography. Just finalizing some lighting setups.", timestamp: "2024-07-10T09:05:00" },
  { id: 3, senderId: 3, text: "Sound design is coming along nicely. We've got some great atmospheric elements.", timestamp: "2024-07-10T09:10:00" },
  { id: 4, senderId: 4, text: "I've started on the rough cut. Should have something to show by end of week.", timestamp: "2024-07-10T09:15:00" },
  { id: 5, senderId: 5, text: "VFX team is ready to go. Just waiting on the final shot list.", timestamp: "2024-07-10T09:20:00" },
]

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [newMessage, setNewMessage] = useState('')

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <div className="flex-grow flex overflow-hidden">
        <Card className="w-1/3 mr-4 flex flex-col">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <ScrollArea className="h-[500px]">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${selectedContact.id === contact.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${contact.avatar}`} />
                    <AvatarFallback>{contact.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                  <Badge variant={contact.status === 'online' ? 'default' : (contact.status === 'away' ? 'secondary' : 'outline')}>
                    {contact.status}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${selectedContact.avatar}`} />
                <AvatarFallback>{selectedContact.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p>{selectedContact.name}</p>
                <p className="text-sm text-muted-foreground">{selectedContact.role}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <ScrollArea className="h-[500px]">
              {messages.map(message => (
                <div key={message.id} className={`flex mb-4 ${message.senderId === selectedContact.id ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] p-3 rounded-lg ${message.senderId === selectedContact.id ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" variant="ghost">
                <PaperclipIcon className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}