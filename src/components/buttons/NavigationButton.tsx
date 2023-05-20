import { Button, useMantineTheme } from "@mantine/core";
import React from "react";

type NavigationButtonProps = {
  variant?: string;
  radius?: string;
  size?: string;
  color?: string;
  onClick?: () => void;
  label: string;
};

const NavigationButton = ({
  variant,
  radius,
  size,
  color,
  onClick,
  label,
}: NavigationButtonProps) => {
  const theme = useMantineTheme();
  return (
    <Button
      variant={variant ?? "outline"}
      radius={radius ?? "xl"}
      compact
      size={size ?? "xs"}
      onClick={onClick}
      color={color ?? "violet"}
      style={{
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.violet[9]
            : theme.colors.dark[9],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.violet[9]
            : theme.colors.dark[9],
      }}
    >
      {label}
    </Button>
  );
};

export default NavigationButton;
