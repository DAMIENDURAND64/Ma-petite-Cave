import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor: `${theme.colors.gray[1]} !important`,
    borderTopLeftRadius: "7px",
    borderTopRightRadius: "7px",
  },
  panel: {
    backgroundColor: theme.colors.gray[1],
    borderBottomLeftRadius: "7px",
    borderBottomRightRadius: "7px",
  },
  item: {
    backgroundColor: theme.colors.gray[1],
  },
  chevron: {
    "&[data-rotate]": {
      transform: "rotate(45deg)",
    },
  },
}));

export default useStyles;
