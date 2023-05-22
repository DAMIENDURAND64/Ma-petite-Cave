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
          backgroundColor: dark
            ? theme.colors.violet[9]
            : theme.colors.violet[6],
          borderColor: dark ? theme.colors.violet[9] : theme.colors.violet[6],
        }}
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
    </div>
  );
};

export default ThemeToggler;
