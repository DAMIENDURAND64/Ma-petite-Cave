import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    borderTopLeftRadius: "7px",
    borderTopRightRadius: "7px",
  },
  panel: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    borderBottomLeftRadius: "7px",
    borderBottomRightRadius: "7px",
  },
  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
    ".mantine-1neqxtr": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.violet[9]
          : theme.colors.violet[6],
      borderRadius: "20px",
      height: "30px",
      width: "30px",
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.violet[9]
          : theme.colors.violet[6]
      }`,
    },
  },
  chevron: {
    "&[data-rotate]": {
      transform: "rotate(45deg)",
    },
  },
}));

export default useStyles;
