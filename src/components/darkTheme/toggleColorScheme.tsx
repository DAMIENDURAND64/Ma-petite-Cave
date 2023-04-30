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
        variant="outline"
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        className="h-7 w-7"
        style={{
          color: dark ? theme.colors.violet[9] : theme.colors.dark[9],
          borderColor: dark ? theme.colors.violet[9] : theme.colors.dark[9],
        }}
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
    </div>
  );
};

export default ThemeToggler;
