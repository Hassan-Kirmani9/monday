import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { PRIORITIES } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const PriorityCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
        bg={color || "transparent"}
        color="gray.900"
      >
        {name}
      </MenuButton>
      <MenuList style={{ backgroundColor: 'white' }}>
      <MenuItem style={{ backgroundColor: 'white' }} onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {PRIORITIES.map((status) => (
          <MenuItem style={{ backgroundColor: 'white' }}
            onClick={() => updateData(row.index, column.id, status)}
            key={status.id}
          >
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default PriorityCell;
