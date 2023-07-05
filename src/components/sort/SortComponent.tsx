import {
  ActionIcon,
  Group,
  Modal,
  Radio,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { ArrowsSort } from "tabler-icons-react";

type SortComponentProps = {
  queries: string[] | undefined;
  onSortChange: ((sortOption: string) => void) | undefined;
};

const SortComponent = ({ queries, onSortChange }: SortComponentProps) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string>();

  const handleSortChange = (sortOption: string) => {
    setValue(sortOption);
    onSortChange && onSortChange(sortOption);
    close();
  };

  return (
    <div>
      <ActionIcon
        variant="outline"
        style={{
          border:
            theme.colorScheme === "dark"
              ? `1px solid ${theme.colors.violet[9]}`
              : `1px solid ${theme.colors.violet[6]}`,
          height: "30px",
          width: "30px ",
        }}
      >
        <ArrowsSort
          size="1.125rem"
          onClick={open}
          color={theme.colorScheme === "dark" ? "white" : "black"}
        />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title="Trier par...">
        <Radio.Group value={value} onChange={handleSortChange}>
          <Group mt="xs">
            <div className="flexcol w-full gap-2">
              {queries?.map((item) => (
                <Radio
                  key={item}
                  value={item}
                  label={item}
                  color="violet"
                  size="sm"
                />
              ))}
            </div>
          </Group>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default SortComponent;
