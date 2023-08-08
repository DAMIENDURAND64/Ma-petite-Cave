/* eslint-disable @typescript-eslint/no-misused-promises */
import { Modal, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { type WineBottle } from "@prisma/client";
import React, { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";

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

type FormValues = {
  location: string;
  format: string;
  quantity: number;
  date: Date;
  with: string;
  comment: string;
};

const ModalWineConsumed = ({
  openedWineModalConsumed,
  closeWineModalConsumed,
  wineBottles,
}: Props) => {
  const [value, setValue] = useState<string | null>(null);
  const { register, handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    console.log("hello");
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="format"
          control={control}
          render={({ field }) => (
            <Select
              data-autofocus
              label="Select the format"
              placeholder="Pick one format"
              data={bottleData}
              dropdownPosition="bottom"
              onChange={(selectedValue) => {
                field.onChange(selectedValue);
                setValue(selectedValue);
              }}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="How many bottles did you drink ?"
              placeholder="Pick a number"
              min={1}
              max={bottleToFindForMaxNumber?.quantity}
              defaultValue={1}
              style={{ marginTop: "20px" }}
              type="number"
              {...field}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DateInput
              label="When did you drink it ?"
              style={{ marginTop: "20px" }}
              {...field}
            />
          )}
        />
        <TextInput
          {...register("location", { required: true })}
          label="Where did you drink it ?"
          style={{ marginTop: "20px" }}
        />
        <Textarea
          {...register("with", { required: true })}
          label="With who did you drink it ?"
          style={{ marginTop: "20px" }}
        />
        <Textarea
          {...register("comment", { required: true })}
          label="What did you think about it ?"
          style={{ marginTop: "20px" }}
        />
        <div className="mt-5 flex w-full justify-end">
          <SubmitButton label="Submit" />
        </div>
      </form>
    </Modal>
  );
};

export default ModalWineConsumed;
