import {
  Container,
  Flex,
  NumberInput,
  Select,
  type SelectItem,
  TextInput,
} from "@mantine/core";
import React from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { type TFormValues } from "../FormType";
import { type Color } from "@prisma/client";

type CreateWineFormDataProps = {
  control: Control<TFormValues>;
  wineColor?: Color[];
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
};

const WineFormStep1 = ({
  control,
  wineColor,
  errors,
  register,
}: CreateWineFormDataProps) => {
  return (
    <div className="w-5/6">
      <Container>
        <Flex direction="column" gap="lg">
          <TextInput
            {...register("name")}
            label="Name"
            error={!!errors.name}
            placeholder={
              errors.name ? errors.name.message : "Domaine de Trevallon"
            }
          />
          <TextInput
            {...register("producer")}
            label="Producer"
            error={!!errors.producer}
            placeholder={
              errors.producer ? errors.producer.message : "Famille DÜRRBACH"
            }
          />
          <TextInput
            {...register("country")}
            label="Country"
            error={!!errors.country}
            placeholder={errors.country ? errors.country.message : "France"}
          />
          <TextInput
            {...register("region")}
            label="Region"
            error={!!errors.region}
            placeholder={errors.region ? errors.region.message : "Provence"}
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
                  placeholder={
                    errors.wineColorId ? errors.wineColorId.message : "Rouge"
                  }
                  searchable
                  transitionProps={{
                    duration: 350,
                    transition: "pop",
                  }}
                  error={!!errors.wineColorId}
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
                placeholder={errors.vintage ? errors.vintage.message : "2022"}
                label="Vintage"
                hideControls
                error={!!errors.vintage}
                onChange={(value) => field.onChange(value)}
                value={field.value}
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
                label="Purchased At"
                error={!!errors.purchasedAt}
                value={field.value}
                onChange={(value) => field.onChange({ target: { value } })}
                placeholder={
                  errors.purchasedAt
                    ? errors.purchasedAt.message
                    : new Date().toDateString()
                }
              />
            )}
          />

          <TextInput
            {...register("servingTemperature")}
            label="Serving temperature"
            placeholder={
              errors.servingTemperature
                ? errors.servingTemperature.message
                : "10/12°C"
            }
            error={!!errors.servingTemperature}
          />
        </Flex>
      </Container>
    </div>
  );
};

export default WineFormStep1;
