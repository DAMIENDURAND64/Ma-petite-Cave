import { NumberInput, Select, type SelectItem, TextInput } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { type CreateWineFormDataProps } from "../FormType";

const WineFormStep1 = ({
  control,
  wineColor,
  errors,
  register,
}: CreateWineFormDataProps) => {
  return (
    <div className="flexcol gap-4 px-3">
      <TextInput
        {...register("name")}
        label="Name"
        error={errors.name?.message}
        placeholder={!errors.name ? "Domaine de Trevallon" : ""}
      />

      <TextInput
        {...register("producer")}
        label="Producer"
        error={errors.producer?.message}
        placeholder={!errors.producer ? "Famille DÜRRBACH" : ""}
      />

      <TextInput
        {...register("country")}
        label="Country"
        error={errors.country?.message}
        placeholder={!errors.country ? "France" : ""}
      />
      <TextInput
        {...register("region")}
        label="Region"
        error={errors.region?.message}
        placeholder={!errors.region ? "Provence" : ""}
      />
      {wineColor && (
        <Controller
          control={control}
          name="wineColorId"
          render={({ field }) => (
            <Select
              {...field}
              data={
                wineColor?.map((color) => ({
                  value: color.id.toString(),
                  label: color.name,
                })) as SelectItem[]
              }
              label="Color"
              placeholder={!errors.wineColorId ? "Rouge" : ""}
              searchable
              transitionProps={{
                duration: 350,
                transition: "pop",
              }}
              error={errors.wineColorId?.message}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      )}
      <Controller
        name="vintage"
        control={control}
        render={({ field }) => (
          <NumberInput
            placeholder={!errors.vintage ? "2023" : ""}
            label="Vintage"
            hideControls
            onChange={(value) => field.onChange(value)}
            value={field.value}
            error={errors.vintage?.message}
            type="number"
          />
        )}
      />
      <Controller
        name="purchasedAt"
        control={control}
        render={({ field }) => (
          <DateInput
            size="xs"
            valueFormat="YYYY MMM DD"
            maxDate={new Date()}
            minDate={new Date(1900, 1, 1)}
            label="Purchased At"
            error={errors.purchasedAt?.message}
            value={field.value}
            onChange={(value) => field.onChange({ target: { value } })}
            placeholder={!errors.purchasedAt ? new Date().toDateString() : ""}
          />
        )}
      />
      <TextInput
        {...register("servingTemperature")}
        label="Serving temperature"
        placeholder={!errors.servingTemperature ? "10/12°C" : ""}
        error={errors.servingTemperature?.message}
      />
    </div>
  );
};

export default WineFormStep1;
