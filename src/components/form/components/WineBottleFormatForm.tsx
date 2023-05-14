// Quantity.tsx
import React from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { NumberInput } from "@mantine/core";
import { type TFormValues } from "../FormType";

type QuantityProps = {
  control: Control<TFormValues, unknown>;
  formatId: string;
  formatName: string;
  errors: FieldErrors<TFormValues>;
};

function WineBottleForm({
  control,
  formatId,
  formatName,
  errors,
}: QuantityProps) {
  return (
    <div className="rounded-md bg-slate-500 p-3">
      <h3 className="text-lg font-semibold text-white">{formatName}</h3>
      <Controller
        name={`price_${formatId}`}
        control={control}
        render={({ field }) => (
          <NumberInput
            name="price"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `${value} €`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : " 1 €"
            }
            label="Price"
            max={100000}
            hideControls
            error={!!errors.price}
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        name={`quantity_${formatId}`}
        control={control}
        render={({ field }) => (
          <NumberInput
            label="Quantity"
            hideControls
            error={!!errors.quantity}
            placeholder={errors.quantity ? errors.quantity.message : "0"}
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </div>
  );
}

export default WineBottleForm;
