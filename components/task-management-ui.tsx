'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { IoDiamondOutline } from "react-icons/io5";

import logo from '../app/images/bigger-desktop_close_monday_dev_logo1.png'; // Adjust the path according to your folder structure
import { CgMenuGridO } from "react-icons/cg";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Bell, ChevronDown, Filter, Grid, HelpCircle, LayoutGrid, MessageSquare, Plus, Search, Settings, Users, X, Check, Edit2, Calendar, ArrowUpDown, Menu } from "lucide-react"

const initialTasks = [
  { id: 1, name: 'Implement user authentication', owner: 'John D.', status: 'In Progress', sprint: 'Sprint 1', dueDate: '2023-07-15', priority: 'High' },
  { id: 2, name: 'Design landing page', owner: 'Jane S.', status: 'Ready to start', sprint: 'Sprint 1', dueDate: '2023-07-20', priority: 'Medium' },
  { id: 3, name: 'Set up CI/CD pipeline', owner: 'Mike R.', status: 'Backlog', sprint: 'Backlog', dueDate: '2023-08-01', priority: 'Low' },
  { id: 4, name: 'Optimize database queries', owner: 'Sarah L.', status: 'In Progress', sprint: 'Sprint 1', dueDate: '2023-07-18', priority: 'High' },
  { id: 5, name: 'Write API documentation', owner: 'Tom B.', status: 'Backlog', sprint: 'Backlog', dueDate: '2023-08-05', priority: 'Medium' },
]

const statuses = ['Backlog', 'Ready to start', 'In Progress', 'Done']
const priorities = ['Low', 'Medium', 'High']

export default function TaskManagementUI() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTaskName, setNewTaskName] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedOwner, setSelectedOwner] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<number|null>(null)
  const [editingTaskName, setEditingTaskName] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const editInputRef = useRef(null)

  useEffect(() => {
    if (editingTaskId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingTaskId])

  const addTask = (sprint) => {
    if (newTaskName) {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        owner: selectedOwner || 'Unassigned',
        status: selectedStatus || 'Backlog',
        sprint: sprint,
        dueDate: newTaskDueDate || '2023-12-31',
        priority: newTaskPriority || 'Medium',
      }
      setTasks([...tasks, newTask])
      setNewTaskName('')
      setSelectedStatus('')
      setSelectedOwner('')
      setNewTaskPriority('')
      setNewTaskDueDate('')
    }
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const updateTaskPriority = (taskId, newPriority) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, priority: newPriority } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const startEditing = (taskId, taskName) => {
    setEditingTaskId(taskId)
    setEditingTaskName(taskName)
  }

  const saveEdit = () => {
    setTasks(tasks.map(task =>
      task.id === editingTaskId ? { ...task, name: editingTaskName } : task
    ))
    setEditingTaskId(null)
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortColumn) return 0
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const renderTaskName = (task) => {
    if (editingTaskId === task.id) {
      return (
        <div className="flex items-center">
          <Input
            ref={editInputRef}
            value={editingTaskName}
            onChange={(e) => setEditingTaskName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') cancelEdit()
            }}
            className="mr-2"
          />
          <Button variant="ghost" size="sm" onClick={saveEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={cancelEdit}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )
    }
    return (
      <div className="flex items-center">
        {task.name}
        <Button variant="ghost" size="sm" onClick={() => startEditing(task.id, task.name)}>
          <Edit2 className="h-4 w-4 ml-2" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-[#e2f0e7] text-black">
    {/* Header */}
    <header className="bg-[#e2f0e7] p-[0.55rem] flex justify-between items-center">
      <div className="flex items-center space-x-4">
      <CgMenuGridO  className='text-[1.5rem] cursor-pointer'/>
        <Image
          src={logo}
          width={110}
          height={110}
          alt="Picture of the author"
          className='cursor-pointer'
        />
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>

        <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent border border-[#00854d] px-[24px] py-[1px] text-[12px] text-[#00854d] hover:bg-[#00854d] hover:text-white">
        <IoDiamondOutline className='pr-[7px] text-[1.3rem]' />
 
        See plans
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5" />
        <MessageSquare className="h-5 w-5" />
        <Users className="h-5 w-5" />
        <Search className="h-5 w-5" />
        <HelpCircle className="h-5 w-5" />
      </div>
    </header>
  
    <div className="flex flex-1">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-[12rem] bg-gradient-to-b from-white to-transparent p-4 overflow-y-auto rounded-[0.5rem] w-full`}>
        <nav>
          <ul className="space-y-2">
            <li className="flex items-center"><LayoutGrid className="mr-2 h-4 w-4" /> Home</li>
            <li className="flex items-center"><Grid className="mr-2 h-4 w-4" /> My work</li>
            <li className="flex items-center">⭐ Favorites</li>
            <li className="font-bold flex items-center"><Users className="mr-2 h-4 w-4" /> My Team</li>
            <li className="pl-4 text-green-500">Tasks</li>
            <li className="pl-4">Sprints</li>
            <li className="pl-4">Epics</li>
            <li className="pl-4">Bugs Queue</li>
            <li className="pl-4">Retrospectives</li>
            <li className="pl-4">Getting Started</li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-4 md:p-6 overflow-auto ml-[1rem] rounded-[0.5rem] bg-white" >
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Tasks</h1>
            <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
              <Button variant="outline" size="sm">
                Integrate
              </Button>
              <Button variant="outline" size="sm">
                Automate / 1
              </Button>
              <Button variant="outline" size="sm">
                Invite / 1
              </Button>
            </div>
          </div>
  
          <Tabs defaultValue="all-sprints" className="space-y-4">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="all-sprints">All Sprints</TabsTrigger>
              <TabsTrigger value="main-table">Main Table</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="active-sprint">Active Sprint</TabsTrigger>
              <TabsTrigger value="add">+</TabsTrigger>
            </TabsList>
          </Tabs>
  
          <div className="my-4 flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  New task <Plus className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your board. Fill in the details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="owner" className="text-right">
                      Owner
                    </Label>
                    <Input
                      id="owner"
                      value={selectedOwner}
                      onChange={(e) => setSelectedOwner(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="col-span-3 bg-gray-700 rounded p-2"
                    >
                      <option value="">Select status</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <select
                      id="priority"
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="col-span-3 bg-gray-700 rounded p-2"
                    >
                      <option value="">Select priority</option>
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogTrigger asChild className='bg-slate-50'>
                  <Button onClick={() => addTask('Sprint 1')}>Add Task</Button>
                </DialogTrigger>
              </DialogContent>
            </Dialog>
            <Input className="w-full md:w-64" placeholder="Search" />
            <Button variant="ghost" size="sm">
              Person
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="ghost" size="sm">
              Sort
            </Button>
            <Button variant="ghost" size="sm">
              Hide / 2
            </Button>
            <Button variant="ghost" size="sm">
              Group by / 1
            </Button>
          </div>
  
          <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h2 className="text-xl font-semibold mb-2 md:mb-0">Sprint 1</h2>
              <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
                <span>Jan 2, '23 - Jan 15, '23</span>
                <Button variant="outline" size="sm">
                  Burndown
                </Button>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <Button variant="ghost" onClick={() => handleSort('name')}>
                      Task {sortColumn === 'name' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('dueDate')}>
                      Due Date {sortColumn === 'dueDate' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('status')}>
                      Status {sortColumn === 'status' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('priority')}>
                      Priority {sortColumn === 'priority' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  </div>
  
  )
}