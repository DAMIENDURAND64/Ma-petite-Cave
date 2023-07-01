import { Button, useMantineTheme } from "@mantine/core";

type DeleteButtonProps = {
  variant?: "filled" | "outline" | "light" | "link";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  label?: string;
};

const DeleteButton = ({
  variant,
  radius,
  size,
  onClick,
  label,
}: DeleteButtonProps) => {
  const theme = useMantineTheme();

  return (
    <Button
      variant={variant ?? "filled"}
      radius={radius ?? "xl"}
      compact
      size={size ?? "xs"}
      onClick={onClick}
      style={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.red[9]
            : theme.colors.red[6],
        fontFamily: "Helvetica",
      }}
    >
      {label}
    </Button>
  );
};

export default DeleteButton;
