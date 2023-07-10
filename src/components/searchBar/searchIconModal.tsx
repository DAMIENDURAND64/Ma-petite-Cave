import { ActionIcon, Modal, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import SearchBar from "./searchBar";
import { useDisclosure } from "@mantine/hooks";

type SearchIconModalProps = {
  scrolled: boolean;
};

const SearchIconModal = ({ scrolled }: SearchIconModalProps) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <ActionIcon
        size="lg"
        variant="filled"
        style={{
          border:
            theme.colorScheme === "dark"
              ? `2px solid ${theme.colors.violet[9]}`
              : `2px solid ${theme.colors.violet[6]}`,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.violet[9]
              : theme.colors.violet[6],
        }}
        onClick={open}
      >
        <IconSearch color="white" />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        yOffset={scrolled ? 55 : 135}
        withCloseButton={false}
        radius="md"
        transitionProps={{
          transition: "fade",
          duration: 400,
          timingFunction: "linear",
        }}
        styles={{
          root: {
            ".mantine-8jl4qs": {
              paddingLeft: `12px !important`,
              paddingRight: `12px !important`,
            },
          },
          body: {
            padding: 0,
          },
        }}
      >
        <SearchBar close={close} />
      </Modal>
    </div>
  );
};

export default SearchIconModal;
