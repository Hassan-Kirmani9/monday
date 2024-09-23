import { forwardRef } from "react";
import { Box, Center, Icon } from "@chakra-ui/react"; // Ensure Chakra UI components are imported
import DatePicker from "react-datepicker"; // Import DatePicker from react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker
import CalendarIcon from "./icons/CalendarIcon"; // Adjust the path as necessary

const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
  <Center ref={ref} onClick={onClick} cursor="pointer">
    {value ? (
      <>
        {value}
        <Box
          pos="absolute"
          right={3}
          fontSize="md"
          color="red.300"
          onClick={(e) => {
            e.stopPropagation();
            clearDate();
          }}
        >
          &times;
        </Box>
      </>
    ) : (
      <Icon as={CalendarIcon} fontSize="xl" />
    )}
  </Center>
));

// Set the display name for the component
DateCustomInput.displayName = 'DateCustomInput';

const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue();
  const { updateData } = table.options.meta;
  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MMM d"
      selected={date}
      onChange={(date) => updateData(row.index, column.id, date)}
      customInput={
        <DateCustomInput
          clearDate={() => updateData(row.index, column.id, null)}
        />
      }
    />
  );
};

export default DateCell;
