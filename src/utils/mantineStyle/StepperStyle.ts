import { createStyles } from "@mantine/core";

export const stepperStyle = createStyles((theme) => ({
  error: {
    ".mantine-ttrh0a": {
      backgroundColor: `${theme.colors.red[4]} !important`,
    },
  },
  background: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.violet[9]} !important`
        : `${theme.colors.violet[6]} !important`,
  },
  borderColor: {
    borderColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.violet[9]} !important`
        : `${theme.colors.violet[6]} !important`,
  },
}));
