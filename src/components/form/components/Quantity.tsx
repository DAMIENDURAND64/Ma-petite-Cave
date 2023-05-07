// Quantity.tsx
import React from "react";
import { TFormValues } from "../WineForm";
import { Control, Controller } from "react-hook-form";
import { NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

type QuantityProps = {
  control: Control<TFormValues, any>;
};

function Quantity({ control }: QuantityProps) {
  return (
    <>
      <Controller
        name="purchasedAt"
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <DateInput
            {...field}
            size="xs"
            valueFormat="YYYY MMM DD"
            label="Purchased At"
          />
        )}
      />
    </>
  );
}

export default Quantity;
