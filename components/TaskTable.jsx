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
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";

const columns = [
  {
    id: 'select',
    header: () => <Checkbox isIndeterminate> Select All </Checkbox>,
    cell: ({ row }) => (
      <Checkbox
      className="ml-[1rem] mt-[0.5rem]"
        isChecked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
         // Smaller checkbox size

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
      enableResizing: false, //disable resizing for just this column
    size: 50, // Adjust width for checkboxes
    minSize: 50, // Ensure minimum width

  },
  {
    accessorKey: "task",
    header: "Task",
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: DateCell,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 420,
    cell: EditableCell,
  },
];

const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

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

  return (
    <Box>
      
      <Box className="table" w={table.getTotalSize()} border="none">
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr"  border="none" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th"  border="none" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Icon
                    as={SortIcon}
                    mx={3}
                    fontSize={14}
                    onClick={header.column.getToggleSortingHandler()}
                  />
                )}
                {
                  {
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()]
                }
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <br />
      
    </Box>
  );
};
export default TaskTable;
