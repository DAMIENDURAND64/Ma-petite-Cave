import { Button, useMantineTheme } from "@mantine/core";
import React from "react";

type SubmitButtonProps = {
  loading?: boolean;
  label: string;
};

const SubmitButton = ({ loading, label }: SubmitButtonProps) => {
  const theme = useMantineTheme();
  return (
    <Button
      type="submit"
      radius="md"
      style={{
        backgroundImage: theme.fn.gradient({
          from: "teal",
          to: "lime",
          deg: 45,
        }),
      }}
      loading={loading}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
