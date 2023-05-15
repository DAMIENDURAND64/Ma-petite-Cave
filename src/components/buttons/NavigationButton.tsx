import { Button } from "@mantine/core";
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
  return (
    <Button
      variant={variant ?? "outline"}
      radius={radius ?? "xl"}
      compact
      size={size ?? "xs"}
      onClick={onClick}
      color={color ?? "violet"}
    >
      {label}
    </Button>
  );
};

export default NavigationButton;
