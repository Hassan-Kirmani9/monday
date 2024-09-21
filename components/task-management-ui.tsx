'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { IoDiamondOutline } from "react-icons/io5";

import logo from '../app/images/bigger-desktop_close_monday_dev_logo1.png'; // Adjust the path according to your folder structure
import { CgMenuGridO } from "react-icons/cg";
import { DateRange } from "react-date-range";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Bell, ChevronDown, Filter, Grid, HelpCircle, LayoutGrid, MessageSquare, Plus, Search, Settings, Users, X, Check, Edit2, Calendar, ArrowUpDown, Menu, ArrowDown } from "lucide-react"
import TaskTable from './TaskTable'

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
  // const [tasks, setTasks] = useState(initialTasks)
  const [newTaskName, setNewTaskName] = useState('')
  const [sprintCount, setSprintCount] = useState(0); // to track clicks on "New Sprint"
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [sprintName, setSprintName] = useState(""); // Input field for Name
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),  // Initialize to current date or null
    endDate: new Date(),
    key: 'selection',
  });
  const [sprintTimeline, setSprintTimeline] = useState("");  // Add sprintTimeline state

  const [sprintGoals, setSprintGoals] = useState(""); // Input field for Sprint Goals
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control Date Picker visibility
  const [formattedTimeline, setFormattedTimeline] = useState(""); // To display selected dates as a string in input field
  const [taskInput, setTaskInput] = useState("");

  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedOwner, setSelectedOwner] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<number|null>(null)
  const [editingTaskName, setEditingTaskName] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('')
  const [showTaskTable, setShowTaskTable] = useState(false);
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [taskTables, setTaskTables] = useState([]); // Array to store TaskTable components

  const [sortDirection, setSortDirection] = useState('asc')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const editInputRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [taskName, setTaskName] = useState(""); // Declare state for task name

  useEffect(() => {
    const savedTablesData = localStorage.getItem("taskTablesData");
    if (savedTablesData) {
      const parsedData = JSON.parse(savedTablesData);
      setTaskTables(parsedData);  // Load the saved data into state
    }
  }, []);
  
  
  useEffect(() => {
    if (editingTaskId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingTaskId])
  const addTask = () => {
    if (taskName.trim()) {
      const newTask = {
        task: taskName,
        status: { id: 1, name: "On Deck" }, // Default status
        priority: { id: 1, name: "Medium" }, // Default priority
        notes: "", // Default notes
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName(""); // Clear the input
    }
  };

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
 
  const handleAddTask = () => {
    if (taskName.trim()) {
      const newTask = {
        task: taskName,
        status: { id: 1, name: "On Deck" }, // Default status
        priority: { id: 1, name: "Medium" }, // Default priority
        notes: "", // Default notes
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName(""); // Clear the input field
    }
  };
  
  const handleNewTaskClick = () => {
    const newTask = { /* Define your new task properties */ };
    handleAddTask(newTask);
  };
  const handleNewSprintClick = () => {
    setIsModalOpen(true); 

  };
  const handleTimelineClick = () => {
    setIsDatePickerOpen(true); // Open the date picker when the input is clicked
  };
  const handleCancelDatePicker = () => {
    setIsDatePickerOpen(false); // Close the date picker
  };
  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    console.log("Date selection:", selection); // Log for debugging
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: 'selection',
    });
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const formattedDateRange = dateRange && dateRange.startDate && dateRange.endDate
      ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
      : "No date range selected"; // Fallback if no date is selected
  
    // Create an object to store both the sprintName and sprintDate
    const newTableData = {
      sprintName,
      sprintDate: formattedDateRange,
    };
  
    // Add the new table to the state and save it in localStorage
    const updatedTableData = [...taskTables, newTableData];
    setTaskTables(updatedTableData); // Update state with the new data
    localStorage.setItem("taskTablesData", JSON.stringify(updatedTableData)); // Save to localStorage
  
    // Close the modal after submission
    setIsModalOpen(false);
  
    // Reset form inputs
    setSprintName("");
    setDateRange({ startDate: new Date(), endDate: new Date(), key: 'selection' });
  };
  
  
  const tasks = [
    { task: "", status: "", priority: "", notes: "" },
    { task: "", status: "", priority: "", notes: "" },
  ];
  

  const handleSort = (column) => {
    if (sort === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // const sortedTasks = [...tasks].sort((a, b) => {
  //   if (!sortColumn) return 0
  //   if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
  //   if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
  //   return 0
  // })



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
      
          <div className="my-4 flex rounded-[0.25rem] hover-bg[#00854D]  flex-wrap items-center space-x-2 space-y-2 md:space-y-0 bg-[#00854D] text-white w-[7rem]  ">
  
    <Button
        className="bg-[#00854D] bg-opacity-100 pr-2 pl-3 hover:bg-[#3f5149] border-r-[1px] rounded-br-[0rem] rounded-tr-[0rem]"
      >
        New Task
      </Button>



   
  {/* Dropdown Button */}
  <div className="relative">
        <Button onClick={toggleDropdown} className="pr-0 pl-0 bg-[#00854D] hover-bg[#00854D]">
          <ArrowDown className="h-4 w-4 hover:text-slate-300" />
        </Button>
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute mt-2 z-50 w-48 bg-white border border-gray-300 rounded shadow-lg">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                onClick={handleNewSprintClick} // Handle click for New Sprint
              >
                New Sprint
              </li>
            </ul>
          </div>
        )}

      </div>

  </div>
  {isModalOpen && (
       <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
       <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem] ">
         <h2 className="text-xl font-semibold mb-4">Create New Sprint</h2>
         <form onSubmit={handleFormSubmit}>
           {/* Name Input */}
           <div className="mb-4 flex items-center">
             <label htmlFor="sprintName" className="block w-[10rem] text-sm font-medium mr-4">
               Sprint Name
             </label>
             <input
               id="sprintName"
               type="text"
               placeholder="Enter sprint name"
               value={sprintName}
               onChange={(e) => setSprintName(e.target.value)}
               className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded"
               required
             />
           </div>
    
           {/* Sprint Timeline Input */}
           <div className="mb-4 relative flex items-center">
            <label htmlFor="sprintTimeline" className="block text-sm font-medium mb-2 w-[11.5rem]">
              Sprint Timeline
            </label>
            <input
              id="sprintTimeline"
              type="text"
              value={formattedTimeline} // Show selected date range
              placeholder="Select sprint timeline"
              onClick={handleTimelineClick} // Show date picker on click
              readOnly
              className="mt-1 block w-full p-2 border bg-white border-gray-300 rounded cursor-pointer"
            />
             {isDatePickerOpen && (
              <div style={{ borderEndEndRadius:"4px", borderEndStartRadius:"4px"}} className="absolute top-[-10rem]  bg-white  ml-4 z-50"> {/* Change 8: Adjusted position to display date picker to the right */}
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={[dateRange]} // Ensure `dateRange` is passed here correctly
                  months={2} // Change 9: Display two months in the date picker
                  direction="horizontal" // Change 10: Display months side by side
                />
                <div style={{display:"flex" , gap:"1rem"}}>
                 <button
          type="button"
          className="bg-red-500 text-white p-3 h-11 ml-[3rem] mt-1 text-sm rounded-md"
          onClick={handleCancelDatePicker}
        >
          Cancel
        </button>
                 <button type="submit" className='bg-[#3d91ff] text-white p-3 ml-[20rem] mb-4 text-sm rounded-md'>Apply Date Range</button>
                 </div>
              </div>
            )}
          </div>
     
         
           {/* Modal Buttons */}
           <div className="flex justify-end">
             <button
               type="button"
               onClick={handleCloseModal}
               className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
             >
               Cancel
             </button>
             <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
               Create Sprint
             </button>
           </div>
         </form>
       </div>
     </div>
     
      )}

          <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto">
           
            {taskTables.map((tableData, index) => (
  <TaskTable
    key={index}
    data1={tasks}
    sprintName={tableData.sprintName}  // Pass the sprint name
    sprintDate={tableData.sprintDate}  // Pass the sprint date
  />
))}

          </div>
        </main>
      </div>
    </div>
  </div>
  
  )
}