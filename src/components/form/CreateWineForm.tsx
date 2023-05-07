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

interface IFormat {
  id: number;
  capacity: string;
  quantity: number;
  unitPrice: number;
}
export type TFormat = {
  id: number;
  capacity: string; // add this line
  quantity: number;
  unitPrice: number;
};

export type TFormValues = {
  name: string;
  color: string;
  formats: TFormat[];
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

const defaultValue: TFormValues = {
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
  servingTemperature: "",
  varietal: [],
  image: "",
};

function WineForm() {
  const [value, setValue] = useState<TFormat[]>([]);

  const { data: bottleFormat } = api.bottleFormat.getAll.useQuery();
  const { data: wineColor } = api.color.getAll.useQuery();

  const addFormat = () => {
    setValue([
      ...value,
      { id: value.length + 1, capacity: "", quantity: 1, unitPrice: 1 },
    ]);
  };

  const removeFormat = (index: number) => {
    const newFormats = value.filter((_, i) => i !== index);
    setValue(newFormats);
  };

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
                    data={
                      bottleFormat?.map((format) => ({
                        value: format.capacity as string,
                        label: format.capacity as string,
                      })) as SelectItem[]
                    }
                    label="Formats"
                    placeholder="Select formats"
                    transitionProps={{
                      duration: 150,
                      transition: "pop-top-left",
                      timingFunction: "ease",
                    }}
                    searchable
                    value={value.map((format) => format.capacity)}
                    onChange={setValue}
                  />
                )}
              />
            )}
            {value.map((format, index) => (
              <div key={format.id} className="my-2 rounded-lg bg-gray-100 p-2">
                <h3 className="mb-2 text-lg font-bold">Format {index + 1}</h3>
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      label="Quantity"
                      placeholder="Quantity"
                      min={0}
                      max={1000}
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
                      label="Unit Price"
                      placeholder="Enter unit price"
                      min={0}
                      max={1000}
                    />
                  )}
                />
              </div>
            ))}
            <button type="button" onClick={addFormat}>
              Add format
            </button>

            <Quantity control={control} />

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
