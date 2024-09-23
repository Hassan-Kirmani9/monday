import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditableCell = ({ row, column }) => {
  const initialValue = row.getValue(column.id);
  const [value, setValue] = useState(initialValue);

  // Handle the input blur event
  const onBlur = () => {
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    />
  );
};

export default EditableCell;
