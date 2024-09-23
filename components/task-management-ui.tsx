'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { IoDiamondOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoBug } from "react-icons/go";
import { TfiCrown } from "react-icons/tfi";
import { LuArrowDownRightFromCircle } from "react-icons/lu";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { MdOutlineTask } from "react-icons/md";
import myteam from "../app/images/myteam.png"
import logo from '../app/images/bigger-desktop_close_monday_dev_logo1.png'; // Adjust the path according to your folder structure
import { CgMenuGridO } from "react-icons/cg";
import { DateRange } from "react-date-range";
import { GoPlus } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import { CiFilter } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";
import { BiSort } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, HelpCircle,  MessageSquare,  Search,  Users,  Menu, ArrowDown } from "lucide-react"
import TaskTable from './TaskTable'
import { IoIosArrowDown } from 'react-icons/io'

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
  // const addTask = () => {
  //   if (taskName.trim()) {
  //     const newTask = {
  //       task: taskName,
  //       status: { id: 1, name: "On Deck" }, // Default status
  //       priority: { id: 1, name: "Medium" }, // Default priority
  //       notes: "", // Default notes
  //     };
  //     setTasks((prevTasks) => [...prevTasks, newTask]);
  //     setTaskName(""); // Clear the input
  //   }
  // };

  // const updateTaskStatus = (taskId, newStatus) => {
  //   setTasks(tasks.map(task => 
  //     task.id === taskId ? { ...task, status: newStatus } : task
  //   ))
  // }

  // const updateTaskPriority = (taskId, newPriority) => {
  //   setTasks(tasks.map(task => 
  //     task.id === taskId ? { ...task, priority: newPriority } : task
  //   ))
  // }

  // const deleteTask = (taskId) => {
  //   setTasks(tasks.filter(task => task.id !== taskId))
  // }

  const startEditing = (taskId, taskName) => {
    setEditingTaskId(taskId)
    setEditingTaskName(taskName)
  }

  // const saveEdit = () => {
  //   setTasks(tasks.map(task =>
  //     task.id === editingTaskId ? { ...task, name: editingTaskName } : task
  //   ))
  //   setEditingTaskId(null)
  // }

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
      // setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName(""); // Clear the input field
    }
  };
  
  // const handleNewTaskClick = () => {
  //   const newTask = { /* Define your new task properties */ };
  //   handleAddTask(newTask);
  // };
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
  

  // const handleSort = (column) => {
  //   if (sort === column) {
  //     setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  //   } else {
  //     setSortColumn(column)
  //     setSortDirection('asc')
  //   }
  // }

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
          width={150}
          height={150}
          alt="Picture of the author"
          className='cursor-pointer'
        />
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>

        <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent border text-[15px] border-[#00854d] px-[24px] py-[1px] text-[#00854d] hover:bg-[#00854d] hover:text-white">
        <IoDiamondOutline className='pr-[7px] text-[1.5rem]' />
 
        See plans
        </Button>
      </div>
      <div className="flex items-center space-x-10">
        <Bell className="h-5 w-5" />
        <MessageSquare className="h-5 w-5" />
        <Users className="h-5 w-5" />
<div className='border-r-2 border-slate-500 pr-6'>
        <IoExtensionPuzzleOutline className="h-5 w-5" />
        </div>
        <Search className="h-5 w-5" />
        <HelpCircle className="h-5 w-5" />
        <FaUserCircle className="h-9 w-9 relative right-2" />
        
      </div>
    </header>
  
    <div className="flex flex-1">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} overflow-hidden md:block md:w-[12rem] bg-gradient-to-b from-white to-transparent p-4 overflow-y-auto rounded-[0.5rem] w-full`}>
        <nav>
          <ul className="space-y-2">
          <li className="flex items-center mt-1" style={{ fontSize: '15px', fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif' }}>
  <GoHome className="mr-2 h-5 w-5"  /> Home
</li>
            <li className="flex items-center " style={{width:"12rem", paddingTop:"4px",paddingBottom:"0.5rem", fontSize: '15px', fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif' }}><SlCalender className="mr-2 h-5 w-5"  /> My work</li>
            <div style={{ borderBottom: '1px solid #ddd', width: '12rem' , marginLeft:"-1rem"}}></div>

            <li className="flex items-center" style={{ fontSize: '15px', paddingBottom:"0.5rem", width:"12rem" ,fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}} ><FaRegStar className="mr-2 h-5 w-5"  /> Favorites</li>
            <div style={{ borderBottom: '1px solid #ddd', width: '12rem' , marginLeft:"-1rem", marginTop:"-3px"}}></div>


            <li className="pt-1 text-green-500 flex items-center">
  <Image src={myteam} alt="My Team" width={24} height={24} />
  <span className="ml-2">Tasks</span>
  <span className="flex ml-auto items-center">
    <TiArrowSortedDown className="ml-2 h-5 w-5 text-slate-400" />
    <BsThreeDots className="ml-2 h-5 w-5 text-slate-400" />
  </span>
</li>
<div className="mt-2 flex items-center">
  <input
    type="text"
    placeholder="Search..."
    className="w-[7rem] bg-white border border-gray-300 rounded-md p-2"
  />
  <div className="ml-2 " style={{border:"1px solid #dddd"  , borderRadius:"2px" , marginRight:"3px"}}>
    <button className="bg-white  text-black p-2 rounded-md">
      <GoPlus className="h-5 w-5" />
    </button>
  </div>
</div>
<li className="pt-1 text-black flex items-center pb-2" style={{fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}}>
<TiArrowSortedDown className="ml-1 h-5 w-5 text-slate-400" />
  <span className="ml-2">My Team</span>
  
</li>

<li className=" ml-[10px] flex items-center gap-2 pb-3 "style={{fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}} >
  <HiOutlineChevronDoubleRight className=" h-3 w-3" />
  Sprints
</li>

<li className=" ml-[10px] flex items-center gap-2 pb-3 "style={{fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}} >
  <TfiCrown className=" h-3 w-3" />
  Epics
</li>
<li className=" ml-[10px] flex items-center gap-2 pb-3 "style={{fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}} >
  <GoBug className=" h-3 w-3" />
  Bugs Queue
</li>
<li className=" ml-[10px] flex items-center gap-2 pb-3 "style={{fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}} >
  <LuArrowDownRightFromCircle className=" h-3 w-3" />
  Retrospectives
</li>
<li className=" ml-[10px] flex items-center gap-2 pb-3 "style={{fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif'}} >
  <MdOutlineTask className=" h-3 w-3" />
  Getting Started
</li>
            
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-4 md:p-6 overflow-auto ml-[1rem] rounded-[0.5rem] bg-white"  >
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
 <h1
      className="text-3xl mb-4 md:mb-0"
      style={{ fontWeight: "500", fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      Tasks
      <IoIosArrowDown  className='text-[20px] mt-2 text-slate-500'/>
    </h1>
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
      <div className='
      flex'>
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
   <div className="relative rounded-[0.25rem] mr-2 p-2 pl-3 pr-3 top-[1.09rem] h-[40px] right-[-2rem] hover:bg-[#6768791a]">

   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <GoSearch style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Search</span>
</div>

   </div>
   <div className="relative rounded-[0.25rem] mr-2 p-2 pl-3 pr-3 top-[1.09rem] h-[40px] right-[-2rem] hover:bg-[#6768791a]">

   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <LuUserCircle style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Person</span>
</div>

   </div>
   <div className="relative rounded-[0.25rem] mr-2 p-2 pl-3 pr-3 top-[1.09rem] h-[40px] right-[-2rem] hover:bg-[#6768791a]">

   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <CiFilter style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Filter</span>
   </div>
</div>
   <div className="relative rounded-[0.25rem] mr-2 p-2 pl-3 pr-3 top-[1.09rem] h-[40px] right-[-2rem] hover:bg-[#6768791a]">

   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <BiSort style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Sort</span>
   </div>
</div>
   <div className="bg-[#c6e9d5] mr-2 relative rounded-[0.25rem] p-2 pl-3 pr-3 top-[1.09rem] h-[40px] right-[-2rem] hover:bg-[#6768791a]">

   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <BiHide style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Hide</span>
   </div>
</div>
   <div className="bg-[#c6e9d5] relative rounded-[0.25rem] p-2 pl-3 pr-3 top-[1.09rem] h-[40px] right-[-2rem] hover:bg-[#6768791a]">

   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <BsLayoutTextSidebarReverse style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Group by / 1 </span>
   </div>
</div>
   {/* <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <BiSort style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Sort</span>
</div>
   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <BiHide style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Hide</span>
</div>
   <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
  <BsLayoutTextSidebarReverse style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
  <span>Group</span>
</div> */}

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
    // data1={tasks}
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