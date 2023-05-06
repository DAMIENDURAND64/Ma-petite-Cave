import {
  Button,
  Container,
  Flex,
  NumberInput,
  Select,
  type SelectItem,
  TextInput,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { api } from "~/utils/api";
import Quantity from "./components/Quantity";

export type TFormValues = {
  name: string;
  color: string;
  formats: string[];
  producer: string;
  country: string;
  region: string;
  vintage: number;
  purchasedAt: Date;
  consumedAt: Date;
  quantity: number;
  unitPrice: number;
  description: string;
  servingTemperature: string;
  varietal?: string[];
  image: string;
};

const defaultValue = {
  name: "",
  color: "",
  formats: [],
  producer: "",
  country: "",
  region: "",
  vintage: 2020,
  purchasedAt: new Date(),
  consumedAt: new Date(),
  quantity: 1,
  unitPrice: 1,
  description: "",
  servingTemperature: 1,
  varietal: [],
  image: "",
};

function WineForm() {
  const [value, setValue] = useState<string[]>([]);

  const { data: bottleFormat } = api.bottleFormat.getAll.useQuery();
  const { data: wineColor } = api.color.getAll.useQuery();

  const { control, handleSubmit } = useForm<TFormValues>();

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(value);

  return (
    <div className="w-5/6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Flex direction="column" gap="lg">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextInput {...field} label="Name" />}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => <TextInput {...field} label="image" />}
            />
            <Controller
              name="producer"
              control={control}
              render={({ field }) => <TextInput {...field} label="Producer" />}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => <TextInput {...field} label="Country" />}
            />
            <Controller
              name="region"
              control={control}
              render={({ field }) => <TextInput {...field} label="Region" />}
            />
            {wineColor && (
              <Controller
                name="color"
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
              <Controller
                name="formats"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    data={bottleFormat?.map((format) => ({
                      value: format.capacity as string,
                      label: format.capacity as string,
                    }))}
                    label="Formats"
                    placeholder="Select formats"
                    transitionProps={{
                      duration: 150,
                      transition: "pop-top-left",
                      timingFunction: "ease",
                    }}
                    searchable
                  />
                )}
              />
            )}
            {value && (
              <Quantity
                value={value}
                bottleFormat={bottleFormat}
                control={control}
              />
            )}

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
                />
              )}
            />
            <Controller
              name="consumedAt"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DateInput
                  {...field}
                  size="xs"
                  valueFormat="YYYY MMM DD"
                  label="Consumed At"
                />
              )}
            />

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
                      ? `${value} €`.replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : " €"
                  }
                  label="Unit Price"
                  max={100000}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} label="description" />
              )}
            />
            <Controller
              name="description"
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

export default WineForm;
