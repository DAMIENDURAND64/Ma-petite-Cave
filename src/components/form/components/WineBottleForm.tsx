// Quantity.tsx
import React from "react";
import { type Control, Controller } from "react-hook-form";
import { NumberInput } from "@mantine/core";
import { type TFormValues } from "../CreateWineFormLogic";

type QuantityProps = {
  control: Control<TFormValues, unknown>;
  formatId: string;
  formatName: string;
};

function WineBottleForm({ control, formatId, formatName }: QuantityProps) {
  return (
    <div className="rounded-md bg-slate-500 p-3">
      <h3 className="text-lg font-semibold text-white">{formatName}</h3>
      <Controller
        name={`price_${formatId}`}
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
            label="Price"
            max={100000}
          />
        )}
      />
      <Controller
        name={`quantity_${formatId}`}
        control={control}
        defaultValue={1}
        render={({ field }) => <NumberInput {...field} label="Quantity" />}
      />
    </div>
  );
}

export default WineBottleForm;
