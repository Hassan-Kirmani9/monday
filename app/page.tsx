'use client'

import  TaskManagementUI  from "@/components/task-management-ui"
import  TaskTable  from "@/components/TaskTable"
import { ChakraProvider} from "@chakra-ui/react"
import theme from "../theme/theme.js";


export default function Page() {
  return(   <ChakraProvider theme={theme}>
     <TaskManagementUI/>
     
     </ChakraProvider>
    )
  // <TaskManagementUI />

}