import React from "react";
import { Button as MantineButton, type ButtonProps } from "@mantine/core";

type TButtonProps = ButtonProps & {
  label: string;
  onClick: () => void;
};

const Button = ({ label, size, onClick, ...rest }: TButtonProps) => {
  return (
    <MantineButton
      variant="outline"
      color="gray"
      size={size ?? "sm"}
      onClick={onClick}
      {...rest}
    >
      {label}
    </MantineButton>
  );
};

export default Button;
