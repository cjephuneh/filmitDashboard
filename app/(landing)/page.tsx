/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { useRouter } from 'next/navigation'


export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const testimonials = [
    { name: "Christopher Nolan", role: "Director", quote: "FilmCollab revolutionized how we manage our productions. It's an indispensable tool for any serious filmmaker." },
    { name: "Ava DuVernay", role: "Producer", quote: "The collaborative features in FilmCollab have streamlined our workflow and improved communication across our entire team." },
    { name: "Roger Deakins", role: "Cinematographer", quote: "FilmCollab's visual planning tools have become an integral part of my pre-production process." },
  ]

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <header className="w-full p-4 fixed z-50 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=20&width=40&text=FD"
              alt="FilmCollab Logo"
              width={20}
              height={20}
              className="rounded-full bg-white"
            />
            <span className="text-2xl font-bold">FilmCollab</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-sm hover:text-blue-400 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#contact" className="text-sm hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className="text-sm">{isDarkMode ? 'Dark' : 'Light'} Mode</span>
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute w-auto min-w-full min-h-full max-w-none"
          >
            <source src="/placeholder.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="relative z-10 text-center space-y-8 px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
            >
              Revolutionize Your <span className="text-blue-400">Filmmaking</span> Process
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl max-w-3xl mx-auto"
            >
              Streamline production, collaborate seamlessly, and bring your vision to life with FilmCollab.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 transition-colors"
                onClick={() => router.push('/dashboard')}
              >
                Start Your Free Trial
              </Button>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        <section id="features" className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Powerful Features for Filmmakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<Icons.film className="h-12 w-12 text-blue-400" />}
                title="Project Management"
                description="Organize your film projects, track progress, and manage tasks all in one place."
              />
              <FeatureCard
                icon={<Icons.users className="h-12 w-12 text-green-400" />}
                title="Team Collaboration"
                description="Seamlessly collaborate with your crew, share files, and communicate in real-time."
              />
              <FeatureCard
                icon={<Icons.dollarSign className="h-12 w-12 text-yellow-400" />}
                title="Budget Tracking"
                description="Keep your production on budget with our intuitive financial management tools."
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="w-full lg:w-1/2 space-y-8">
                <h2 className="text-4xl font-bold">Experience the Future of Film Production</h2>
                <p className="text-xl text-gray-300">
                  Our cutting-edge dashboard provides real-time insights, powerful analytics, and seamless integration with industry-standard tools.
                </p>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Request a Demo
                </Button>
              </div>
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Dashboard+Preview"
                  alt="FilmCollab Dashboard Preview"
                  width={600}
                  height={400}
                  className="relative rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">What Industry Leaders Say</h2>
            <div className="relative h-64">
              <AnimatePresence>
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <p className="text-xl italic mb-4">"{testimonials[currentTestimonial].quote}"</p>
                  <p className="font-bold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 bg-gradient-to-b from-blue-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Plan</TableHead>
                    <TableHead>Indie</TableHead>
                    <TableHead>Studio</TableHead>
                    <TableHead>Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    <TableCell>$29/month</TableCell>
                    <TableCell>$99/month</TableCell>
                    <TableCell>Custom</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Projects</TableCell>
                    <TableCell>Up to 3</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Team Members</TableCell>
                    <TableCell>Up to 5</TableCell>
                    <TableCell>Up to 20</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Storage</TableCell>
                    <TableCell>50GB</TableCell>
                    <TableCell>500GB</TableCell>
                    <TableCell>Custom</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Support</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>24/7 Dedicated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Action</TableCell>
                    <TableCell>
                      <Button size="sm">Choose Plan</Button>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Contact Sales</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does FilmCollab handle data security?</AccordionTrigger>
                <AccordionContent>
                  FilmCollab employs industry-standard encryption and security measures to protect your data. We use secure cloud storage and regular backups to ensure your projects are safe and accessible only to authorized team members.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I integrate FilmCollab with other tools?</AccordionTrigger>
                <AccordionContent>
                  Yes, FilmCollab offers integrations with popular filmmaking and project management tools. Our API also allows for custom integrations to fit your specific workflow needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a limit to the number of projects I can manage?</AccordionTrigger>
                <AccordionContent>
                  The number of projects you can manage depends on your subscription plan. Our Indie plan allows up to 3 projects, while Studio and Enterprise plans offer unlimited projects.
                </AccordionContent>
              
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you offer custom solutions for large studios?</AccordionTrigger>
                <AccordionContent>
                  Our Enterprise plan is tailored to the needs of large studios. We offer custom features, dedicated support, and scalable solutions to meet the demands of complex, high-budget productions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="contact" className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
                <p className="text-xl mb-8">Have questions? We're here to help you bring your vision to life.</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Icons.mapPin className="h-6 w-6 text-blue-400" />
                    <span>123 Film Street, Hollywood, CA 90028</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icons.phone className="h-6 w-6 text-blue-400" />
                    <span>+1 (323) 555-1234</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icons.mail className="h-6 w-6 text-blue-400" />
                    <span>contact@FilmCollab.com</span>
                  </div>
                </div>
              </div>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
                  <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" className="bg-gray-800 border-gray-700" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Your message"
                        className="rounded-md bg-gray-800 border border-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 FilmCollab. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icons.instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <Button size="lg" className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700">
          <Icons.messageCircle className="mr-2 h-4 w-4" />
          Chat with Us
        </Button>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-75"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}