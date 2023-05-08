// Quantity.tsx
import React from "react";
import { type Control, Controller } from "react-hook-form";
import { NumberInput } from "@mantine/core";
import { type TFormValues } from "../CreateWineForm";

type QuantityProps = {
  control: Control<TFormValues, unknown>;
};

function WineBottleForm({ control }: QuantityProps) {
  return (
    <>
      <Controller
        name="unitPrice"
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <NumberInput
            {...field}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `${value} €`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : " €"
            }
            label="Unit Price"
            max={100000}
          />
        )}
      />
      <Controller
        name={"quantity"}
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <NumberInput
            {...field}
            label="Quantity"
            max={100000}
            min={1}
            placeholder="Quantity"
          />
        )}
      />
    </>
  );
}

export default WineBottleForm;
