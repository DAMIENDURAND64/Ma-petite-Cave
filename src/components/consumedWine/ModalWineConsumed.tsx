import { Modal, NumberInput, Select, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { type WineBottle } from "@prisma/client";
import React from "react";

type Props = {
  openedWineModalConsumed: boolean;
  closeWineModalConsumed: () => void;
  wineBottles: (WineBottle & {
    format: {
      name: string;
      capacity: string;
    };
  })[];
};

const ModalWineConsumed = ({
  openedWineModalConsumed,
  closeWineModalConsumed,
  wineBottles,
}: Props) => {
  const bottleData = wineBottles.map((wineBottle) => ({
    value: wineBottle.format.name,
    label: `${wineBottle.format.name} (${wineBottle.format.capacity})`,
  }));

  return (
    <Modal
      opened={openedWineModalConsumed}
      onClose={closeWineModalConsumed}
      styles={{
        root: {
          ".mantine-3cevnw": {
            minHeight: `300px !important`,
          },
        },
      }}
      title="Give us some details"
    >
      <Select
        data-autofocus
        label="Select the format"
        placeholder="Pick one format"
        data={bottleData}
        dropdownPosition="bottom"
      />
      <NumberInput
        label="How many bottles did you drink?"
        placeholder="Pick a number"
        min={1}
        max={100}
        defaultValue={1}
        style={{ marginTop: "20px" }}
      />
      <DateInput label="When did you drink it?" style={{ marginTop: "20px" }} />
      <Textarea
        label="With who did you drink it?"
        style={{ marginTop: "20px" }}
      />

      <Textarea
        label="What did you think about it?"
        style={{ marginTop: "20px" }}
      />
    </Modal>
  );
};

export default ModalWineConsumed;
