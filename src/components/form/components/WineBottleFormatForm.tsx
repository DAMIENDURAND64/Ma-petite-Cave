// Quantity.tsx
import React from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { NumberInput } from "@mantine/core";
import { type TFormValues } from "../FormType";

type QuantityProps = {
  control: Control<TFormValues, unknown>;
  formatId: string;
  formatName: string;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
};

function WineBottleForm({
  control,
  formatId,
  formatName,
  errors,
  register,
}: QuantityProps) {
  return (
    <div className="rounded-md bg-slate-500 p-3">
      <h3 className="text-lg font-semibold text-white">{formatName}</h3>
      <Controller
        name={`price_${formatId}`}
        control={control}
        render={({ field }) => (
          <NumberInput
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            label="Price"
            max={100000}
            hideControls
            error={errors.price?.message}
            placeholder={!errors.price?.message ? "0" : ""}
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
            error={errors.quantity?.message}
            placeholder={!errors.quantity?.message ? "0" : ""}
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </div>
  );
}

export default WineBottleForm;
