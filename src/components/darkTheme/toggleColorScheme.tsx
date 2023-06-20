import {
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const ThemeToggler = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";

  return (
    <div className="flex justify-end">
      <ActionIcon
        variant="filled"
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        size="lg"
        style={{
          border: dark
            ? `2px solid ${theme.colors.violet[9]}`
            : `2px solid ${theme.colors.violet[6]}`,
          backgroundColor: dark
            ? theme.colors.violet[9]
            : theme.colors.violet[6],
        }}
      >
        {dark ? (
          <IconSun size="1.5rem" color={dark ? "white" : "black"} />
        ) : (
          <IconMoonStars size="1.5rem" color={dark ? "white" : "black"} />
        )}
      </ActionIcon>
    </div>
  );
};

export default ThemeToggler;
