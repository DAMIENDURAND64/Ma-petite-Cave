import { Loader, useMantineTheme } from "@mantine/core";
import React from "react";

export const LoaderRing = () => {
  const theme = useMantineTheme();

  return (
    <Loader
      size="xl"
      color={
        theme.colorScheme === "dark"
          ? theme.colors.violet[9]
          : theme.colors.violet[6]
      }
    />
  );
};
