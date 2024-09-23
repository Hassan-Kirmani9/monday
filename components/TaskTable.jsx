'use client'
import { useState } from "react";
import { Box, Button, ButtonGroup, Checkbox, Icon, Text } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../data";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { PiUserCircle } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { TbArrowForward } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";

import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import PriorityCell from "./PriorityCell";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const columns = [
  {
    id: 'select',
    header: (
      <Checkbox
        sx={{
          '& .chakra-checkbox__control': {
            bg: 'white',
            borderColor: 'gray.300',
          },
          '& .chakra-checkbox__control:checked': {
            bg: 'green.500',
            borderColor: 'green.500',
          },
          '& .chakra-checkbox__control:checked:hover': {
            bg: 'green.600',
            borderColor: 'green.600',
          },
        }}
        className="ml-[-0.1rem] mt-[0.5rem]"
        // isChecked={false}
        // onChange={true}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ml-[1rem] mt-[0.5rem]"
        isChecked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
        sx={{
          '& .chakra-checkbox__control': {
            bg: row.getIsSelected() ? 'green.500' : 'white',
            borderColor: row.getIsSelected() ? 'green.500' : 'gray.300',
          },
          '& .chakra-checkbox__control:checked': {
            bg: 'green.500',
            borderColor: 'green.500',
          },
          '& .chakra-checkbox__control:checked:hover': {
            bg: 'green.600',
            borderColor: 'green.600',
          },
        }}
      />
    ),
    enableResizing: false,
    size: 50,
    minSize: 50,
  },
  {
    accessorKey: "taskDetails",
    header: "Task",
    enableSorting: false,
    cell: ({ row }) => (
      <Box display="flex">
        <Box flex="2" padding="0.5rem" borderRight="1px solid #ddd">
          <EditableCell row={row} column={{ id: "taskDetails" }} table={row.table} />
        </Box>
        <Box
          width="70px"
          padding="0.5rem"
          display="flex"
          alignItems="center"
          flexShrink={0}
        >
          <Text>{row.getValue("taskDetails")}</Text>
          <Box
            as={BiMessageRoundedAdd}
            style={{ height: "25px", width: "37px", marginLeft: '0.5rem', cursor: 'pointer' }}
            color="#a2a2a2"
            _hover={{ color: "#00854d" }}
          />
        </Box>
      </Box>
    ),
    size: 300,
  },
  {
    accessorKey: "messageIcon",
    header: "Owner",
    cell: () => (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Box
          as={PiUserCircle}
          style={{ height: "25px", width: "37px", cursor: 'pointer' }}
          color="#a2a2a2"
          _hover={{ color: "#00854d" }}
        />
      </Box>
    ),
    enableResizing: false,
    enableSorting: false,
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
    enableSorting: false,
    minSize: 150,
    maxSize: 200,
    enableColumnFilter: true,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: PriorityCell,
    enableSorting: false,
    minSize: 150,
    maxSize: 200,
    enableColumnFilter: true,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 420,
    cell: EditableCell,
  },
];

const TaskTable = ({ sprintName, sprintDate, onAddTask }) => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

  const toggleTableVisibility = () => {
    setIsTableVisible((prev) => !prev);
  };

  const addTask = (newTask) => {
    setData((prevData) => [...prevData, newTask]);
    if (onAddTask) onAddTask(newTask);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });
  const formatDateRange = (dateRange) => {
    const [startDate, endDate] = dateRange.split(' - ').map(date => new Date(date));
    
    const options = { day: 'numeric', month: 'short' };
    
    const formattedStart = startDate.toLocaleDateString('en-US', options);
    const formattedEnd = endDate.toLocaleDateString('en-US', options);
    
    return `${formattedStart} - ${formattedEnd}`;
  };
  

  return (
    <Box>
<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <Icon
    as={isTableVisible ? IoIosArrowDown : IoIosArrowForward}
    onClick={toggleTableVisibility}
    style={{ cursor: "pointer" }}
  />
  <h1 className="text-[#00854d] text-[20px] font-medium" style={{ flexGrow: 1 }}>{sprintName}</h1>
  <span className="hover:bg-slate-200 cursor-pointer   p-1.5 mb-1 rounded-sm" style={{ width: "10rem", textAlign: "center" }}>{formatDateRange(sprintDate)}</span>
  <span className="hover:bg-slate-200 cursor-pointer  p-1.5 mb-1 rounded-sm border-[1px] border-slate-400 " style={{ width: "6rem", textAlign: "center" }}>Burndown</span>
  <span className="hover:bg-slate-200 cursor-pointer  p-1.5 mb-1 rounded-sm border-[1px] border-slate-400" style={{ width: "6rem", textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <TbArrowForward style={{ marginRight: '0.5rem' }} />
  <span>Start</span>
</span> 
  <span className="hover:bg-slate-200 cursor-pointer mr-[9rem] p-1.5 mb-1 rounded-sm border-[1px]  " style={{ width: "2rem", textAlign: "center", fontSize:"20px" }}><BsThreeDots/></span>
 </div>

      {isTableVisible && (
        <Box className="table" w={table.getTotalSize()} border="none">
          {table.getHeaderGroups().map((headerGroup) => (
            <Box className="tr" border="none" key={headerGroup.id} style={{    borderStartStartRadius: "6px",
              borderEndStartRadius: "6px",
              borderLeft: "6px solid #00854d"}}>
              {headerGroup.headers.map((header) => (
                <Box className="th" border="none" w={header.getSize()} key={header.id }>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <Icon
                      // as={SortIcon}
                      mx={3}
                      fontSize={14}
                      onClick={header.column.getToggleSortingHandler()}
                    />
                  )}
                  {header.column.getIsSorted() && (
                    <span>
                      {header.column.getIsSorted() === 'asc' ? " 🔼" : " 🔽"}
                    </span>
                  )}
                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                  />
                </Box>
              ))}
            </Box>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Box className="tr" key={row.id} style={{    borderStartStartRadius: "6px",
              borderEndStartRadius: "6px",
              borderLeft: "6px solid #00854db0"}}>
              {row.getVisibleCells().map((cell) => (
                <Box className="td" w={cell.column.getSize()} key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
      <br />
    </Box>
  );
};

export default TaskTable;
