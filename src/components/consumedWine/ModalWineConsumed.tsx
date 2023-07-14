import { Modal, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { type WineBottle } from "@prisma/client";
import React, { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";

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
  const [value, setValue] = useState<string | null>(null);

  const bottleData = wineBottles.map((wineBottle) => ({
    value: wineBottle.format.name,
    label: `${wineBottle.format.name} (${wineBottle.format.capacity})`,
    quantity: wineBottle.quantity,
  }));

  const bottleToFindForMaxNumber = wineBottles.find(
    (bottle) => bottle.format.name === value
  );

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
        value={value}
        onChange={setValue}
      />
      <NumberInput
        label="How many bottles did you drink ?"
        placeholder="Pick a number"
        min={1}
        max={bottleToFindForMaxNumber?.quantity}
        defaultValue={1}
        style={{ marginTop: "20px" }}
      />
      <DateInput
        label="When did you drink it ?"
        style={{ marginTop: "20px" }}
      />
      <TextInput
        label="Where did you drink it ?"
        style={{ marginTop: "20px" }}
      />
      <Textarea
        label="With who did you drink it ?"
        style={{ marginTop: "20px" }}
      />
      <Textarea
        label="What did you think about it ?"
        style={{ marginTop: "20px" }}
      />
      <div className="mt-5 flex w-full justify-end">
        <SubmitButton label="Submit" />
      </div>
    </Modal>
  );
};

export default ModalWineConsumed;
