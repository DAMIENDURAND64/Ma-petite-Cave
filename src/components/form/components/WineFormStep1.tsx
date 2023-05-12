import {
  Container,
  Flex,
  NumberInput,
  Select,
  type SelectItem,
  TextInput,
} from "@mantine/core";
import React from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { type TFormValues } from "../WineFormLogic";
import { type Color } from "@prisma/client";

type CreateWineFormDataProps = {
  handleFormSubmit: (e: React.FormEvent) => void;
  control: Control<TFormValues>;
  wineColor?: Color[];
  errors: FieldErrors<TFormValues>;
};

function WineFormStep1({
  handleFormSubmit,
  control,
  wineColor,

  errors,
}: CreateWineFormDataProps) {
  return (
    <div className="w-5/6">
      <form onSubmit={handleFormSubmit}>
        <Container>
          <Flex direction="column" gap="lg">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Name"
                  error={!!errors.name}
                  placeholder={
                    errors.name ? errors.name.message : "Domaine de Trevallon"
                  }
                />
              )}
            />

            <Controller
              name="producer"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Producer"
                  error={!!errors.producer}
                  placeholder={
                    errors.producer
                      ? errors.producer.message
                      : "Famille DÜRRBACH"
                  }
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Country"
                  error={!!errors.country}
                  placeholder={
                    errors.country ? errors.country.message : "France"
                  }
                />
              )}
            />
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Region"
                  error={!!errors.region}
                  placeholder={
                    errors.region ? errors.region.message : "Provence"
                  }
                />
              )}
            />
            {wineColor && (
              <Controller
                name="wineColorId"
                control={control}
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
                  />
                )}
              />
            )}
            <Controller
              name="vintage"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  placeholder={errors.vintage ? errors.vintage.message : "2022"}
                  label="Vintage"
                  hideControls
                  error={!!errors.vintage}
                />
              )}
            />

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
                  defaultValue={new Date()}
                />
              )}
            />
            <Controller
              name="servingTemperature"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Serving temperature"
                  defaultValue=""
                  placeholder="10/12"
                />
              )}
            />
          </Flex>
        </Container>
      </form>
    </div>
  );
}

export default WineFormStep1;
