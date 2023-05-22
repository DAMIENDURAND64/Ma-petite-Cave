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
  onClick,
  label,
}: NavigationButtonProps) => {
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
            ? theme.colors.violet[9]
            : theme.colors.violet[6],
        fontFamily: "Helvetica",
      }}
    >
      {label}
    </Button>
  );
};

export default NavigationButton;
