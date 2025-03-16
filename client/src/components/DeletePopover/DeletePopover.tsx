import { Button, Text, Icon } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";

type DeletePopoverProps = {
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DeletePopover: React.FC<DeletePopoverProps> = ({ onDelete }) => {
  return (
    <Popover.Root>
      <Popover.Trigger cursor="pointer" onClick={(e) => e.stopPropagation()}>
        <Icon
          backgroundColor="transparent"
          aria-label="Toggle item"
          width="20px"
          height="20px"
          color="#848484"
        >
          <TbDotsVertical />
        </Icon>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content maxWidth="150px">
            <Popover.Body padding="7px">
              <Button
                height="20px"
                backgroundColor="transparent"
                color="#ff5e49"
                width="100%"
                onClick={onDelete}
              >
                <Icon as={FaRegTrashAlt} />
                <Text>Видалити</Text>
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
