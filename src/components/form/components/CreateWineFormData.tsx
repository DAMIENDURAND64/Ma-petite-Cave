import {
  Button,
  Container,
  Flex,
  MultiSelect,
  NumberInput,
  Select,
  type SelectItem,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";
import {
  type Control,
  Controller,
  type UseFormSetValue,
} from "react-hook-form";
import WineBottleForm from "./WineBottleForm";
import { DateInput } from "@mantine/dates";
import { type TFormValues } from "../CreateWineFormLogic";
import { type BottleFormat, type Color } from "@prisma/client";

type CreateWineFormDataProps = {
  handleFormSubmit: (e: React.FormEvent) => void;
  control: Control<TFormValues>;
  wineColor?: Color[];
  bottleFormat?: BottleFormat[];
  formatsValue: string[];
  setFormatsValue: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<TFormValues>;
};

function CreateWineFormData({
  handleFormSubmit,
  control,
  wineColor,
  bottleFormat,
  formatsValue,
  setFormatsValue,
  setValue,
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
                <TextInput {...field} defaultValue="" label="Name" />
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextInput {...field} defaultValue="" label="image" />
              )}
            />
            <Controller
              name="producer"
              control={control}
              render={({ field }) => (
                <TextInput {...field} defaultValue="" label="Producer" />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextInput {...field} defaultValue="" label="Country" />
              )}
            />
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <TextInput {...field} defaultValue="" label="Region" />
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
                    placeholder="Select color"
                    defaultValue=""
                    searchable
                  />
                )}
              />
            )}
            <Controller
              name="vintage"
              control={control}
              defaultValue={2020}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  placeholder="vintage"
                  defaultValue={2020}
                  label="vintage"
                />
              )}
            />
            {bottleFormat && (
              <MultiSelect
                data={bottleFormat?.map((format) => ({
                  value: format.id.toString(),
                  label: `${format.name} (${format.capacity})`,
                }))}
                label="Formats"
                placeholder="Select formats"
                transitionProps={{
                  duration: 150,
                  transition: "pop-top-left",
                  timingFunction: "ease",
                }}
                searchable
                defaultValue={[]}
                value={formatsValue}
                onChange={(value) => {
                  setFormatsValue(value);
                  setValue("formats", value);
                }}
              />
            )}

            {formatsValue?.map((formatId: string) => {
              const format = bottleFormat?.find(
                (f) => f.id.toString() === formatId
              );
              const formatName = format
                ? `${format.name} (${format.capacity})`
                : "Unknown";
              return (
                <div key={formatId}>
                  <WineBottleForm
                    control={control}
                    key={formatId}
                    formatId={formatId}
                    formatName={formatName}
                  />
                </div>
              );
            })}

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
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} defaultValue="" label="description" />
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
            <Controller
              name="submit"
              control={control}
              render={({ field }) => (
                <Button type="submit" {...field}>
                  Add
                </Button>
              )}
            />
          </Flex>
        </Container>
      </form>
    </div>
  );
}

export default CreateWineFormData;
