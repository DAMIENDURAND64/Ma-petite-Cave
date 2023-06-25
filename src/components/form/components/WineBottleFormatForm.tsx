import React from "react";
import { Controller } from "react-hook-form";
import { NumberInput } from "@mantine/core";
import { type QuantityProps } from "../FormType";

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
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            label="Price"
            min={1}
            defaultValue={1}
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
            min={1}
            defaultValue={1}
            max={100000}
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
