import { Button, Text, Icon } from "@chakra-ui/react";

type RegularButtonProps = {
  onClick: () => void;
  icon: React.ElementType;
  text: string;
  maxWidth?: string;
  color?: string;
};

export const RegularButton: React.FC<RegularButtonProps> = ({
  onClick,
  icon,
  text,
  maxWidth,
  color = "#6200c4",
}) => {
  return (
    <Button
      backgroundColor="#f0e2fe"
      color={color}
      onClick={onClick}
      width="100%"
      maxWidth={maxWidth}
    >
      <Icon width="16px" height="16px" as={icon} />
      <Text>{text}</Text>
    </Button>
  );
};
