import {
  Button,
  Container,
  Flex,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DateInput } from "@mantine/dates";

type TFormValues = {
  name: string;
  producer: string;
  country: string;
  region: string;
  vintage: number;
  purchasedAt: Date;
  consumedAt: Date;
  quantity: number;
  unitPrice: number;
  description: string;
};

const defaultValue = {
  name: "",
  producer: "",
  country: "",
  region: "",
  vintage: 2020,
  purchasedAt: new Date(),
  consumedAt: new Date(),
  quantity: 1,
  unitPrice: 1,
  description: "",
};

function WineForm() {
  const { handleSubmit, control } = useForm<TFormValues>({
    defaultValues: defaultValue,
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="w-5/6">
      <form onSubmit={onSubmit}>
        <Container>
          <Flex direction="column" gap="lg">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextInput {...field} label="Name" />}
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
              name="quantity"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <NumberInput {...field} label="Quantity" max={100} />
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
