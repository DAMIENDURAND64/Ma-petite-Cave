import { Button as MantineButton, useMantineTheme } from "@mantine/core";

type DeleteButtonProps = {
  variant?: "filled" | "outline" | "light" | "link";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  label?: string;
  color: "red" | "violet";
};

const CustomizeButton = ({
  variant,
  radius,
  size,
  onClick,
  label,
  color,
}: DeleteButtonProps) => {
  const theme = useMantineTheme();

  const backgroundColor =
    theme.colorScheme === "dark"
      ? theme.colors[color][9]
      : theme.colors[color][6];

  return (
    <MantineButton
      variant={variant ?? "filled"}
      radius={radius ?? "xl"}
      compact
      size={size ?? "xs"}
      onClick={onClick}
      style={{
        backgroundColor,
        fontFamily: "Helvetica",
      }}
    >
      {label}
    </MantineButton>
  );
};

export default CustomizeButton;
