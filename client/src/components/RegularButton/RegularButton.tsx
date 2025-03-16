import { Button, Text, Icon } from "@chakra-ui/react";

type RegularButtonProps = {
  onClick: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  form?: string;
  icon?: React.ElementType;
  text: string;
  maxWidth?: string;
  loading?: boolean;
};

export const RegularButton: React.FC<RegularButtonProps> = ({
  onClick,
  icon,
  text,
  maxWidth,
  variant = "secondary",
  type = "button",
  loading = false,
  form,
}) => {
  const color = variant === "primary" ? "white" : "#6200c4";
  const backgroundColor = variant === "primary" ? "#7e00fc" : "#f0e2fe";

  return (
    <Button
      form={form}
      type={type}
      backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
      width="100%"
      maxWidth={maxWidth}
      loading={loading}
    >
      {icon && <Icon width="16px" height="16px" as={icon} />}
      <Text>{text}</Text>
    </Button>
  );
};
