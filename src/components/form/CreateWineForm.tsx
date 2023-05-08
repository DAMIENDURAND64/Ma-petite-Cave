import {
  Button,
  Container,
  Flex,
  NumberInput,
  Select,
  type SelectItem,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { api } from "~/utils/api";
import WineBottleForm from "./components/WineBottleForm";
import { useSession } from "next-auth/react";

interface WineBottleProps {
  wineBottles: {
    quantity: number;
    price: number;
    format: {
      id: number;
    };
  }[];
}

export type TFormat = {
  id: number;
  capacity: string;
  quantity: number;
  unitPrice: number;
};

export type TFormValues = {
  name: string;
  producer: string;
  varietal?: string[];
  country: string;
  region: string;
  vintage: number;
  purchasedAt: Date;
  consumedAt: Date;
  description: string;
  image: string;
  servingTemperature: string;
  ownerId: string;
  wineColorId: string;
  wineBottles: WineBottleProps;
  quantity: number;
  unitPrice: number;
  formats: string;
};

function WineForm() {
  const { data: sessionData } = useSession();

  const { data: bottleFormat } = api.bottleFormat.getAll.useQuery();
  const { data: wineColor } = api.color.getAll.useQuery();

  const { control, handleSubmit } = useForm<TFormValues>();

  const createWineMutation = api.wines.create.useMutation();

  const onSubmit = (data: TFormValues) => {
    if (sessionData) {
      const payload = {
        name: data.name,
        producer: data.producer,
        varietal: data.varietal,
        country: data.country,
        region: data.region,
        vintage: data.vintage,
        purchasedAt: data.purchasedAt || new Date(),
        consumedAt: data.consumedAt,
        description: data.description,
        image: data.image,
        servingTemperature: data.servingTemperature || "10-12",
        ownerId: sessionData.user.id,
        wineColorId: parseInt(data.wineColorId) || 1,
        wineBottles: [
          {
            quantity: data.quantity,
            price: data.unitPrice,
            format: {
              id: parseInt(data.formats),
            },
          },
        ],
      };
      console.log(payload);

      createWineMutation.mutate(payload);
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSubmit(onSubmit)();
  };

  return (
    <div className="w-5/6">
      <form onSubmit={handleFormSubmit}>
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
                  <Select
                    {...field}
                    data={bottleFormat?.map((format) => ({
                      value: format.id.toString(),
                      label: format.capacity,
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
            <WineBottleForm control={control} />

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
