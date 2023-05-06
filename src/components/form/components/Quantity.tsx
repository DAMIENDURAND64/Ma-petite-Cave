// Quantity.tsx
import React from "react";
import { TFormValues } from "../WineForm";
import { Controller } from "react-hook-form";
import { NumberInput } from "@mantine/core";

type QuantityProps = {
  value: string[];
  bottleFormat: any;
  control: any;
};

function Quantity({ value, bottleFormat, control }: QuantityProps) {
  return (
    <>
      {value.map((format, index) => {
        const fieldName = `quantities.${format}`; // Use dynamic field name
        return (
          <Controller
            key={index}
            name={fieldName}
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <NumberInput {...field} label={format} min={1} max={1000} />
            )}
          />
        );
      })}
    </>
  );
}

export default Quantity;
