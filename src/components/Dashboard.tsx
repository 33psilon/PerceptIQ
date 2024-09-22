'use client'

import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboard, Users, TrendingUp, Send, Menu, User, Settings, LogOut } from 'lucide-react'

// Mock data for charts
const userAnalyticsData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 3000 },
  { name: 'Mar', users: 2000 },
  { name: 'Apr', users: 2780 },
  { name: 'May', users: 1890 },
  { name: 'Jun', users: 2390 },
]

const marketTrendsData = [
  { name: 'Jan', trend: 4000 },
  { name: 'Feb', trend: 3000 },
  { name: 'Mar', trend: 5000 },
  { name: 'Apr', trend: 4780 },
  { name: 'May', trend: 3890 },
  { name: 'Jun', trend: 6390 },
]

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you with product analysis today?", isBot: true },
  ])
  const [input, setInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }])
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm analyzing your request. Please give me a moment.", isBot: true }])
      }, 1000)
      setInput("")
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* Sidebar */}
      <div className={`lg:w-64 bg-white shadow-md lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="p-4 flex justify-between items-center lg:justify-start">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Users className="mr-3 h-5 w-5" />
            Users
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <TrendingUp className="mr-3 h-5 w-5" />
            Trends
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="lg:hidden">
            <Button variant="outline" onClick={toggleSidebar}>
              <Menu className="h-6 w-6 mr-2" />
              Menu
            </Button>
          </div>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Product/Company Name</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dashboard content */}
        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* User Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="trend" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Chatbot */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Product Analysis Chatbot</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] lg:h-[400px] w-full rounded-md border p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.isBot ? 'text-left' : 'text-right'
                      }`}
                    >
                      <span
                        className={`inline-block rounded-lg px-4 py-2 ${
                          message.isBot
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {message.text}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
                <div className="mt-4 flex">
                  <Input
                    type="text"
                    placeholder="Ask about product analysis..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}