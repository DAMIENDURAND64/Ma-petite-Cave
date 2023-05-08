import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CreateWineFormData from "./components/CreateWineFormData";

interface WineBottleProps {
  wineBottles: {
    quantity: number;
    price: number;
    format: {
      id: number;
      capacity: string;
    };
  }[];
}

export type TFormValues = {
  name: string;
  producer: string;
  varietal?: string[];
  country: string;
  region: string;
  vintage: number;
  purchasedAt: Date;
  description: string;
  image: string;
  servingTemperature: string;
  ownerId: string;
  wineColorId: string;
  wineBottles: WineBottleProps["wineBottles"];
  quantity: number;
  unitPrice: number;
  formats: string[];
} & { [key: string]: number };

function CreateWineFormLogic() {
  const { data: sessionData } = useSession();
  const [formatsValue, setFormatsValue] = useState<string[]>([]);

  const { data: bottleFormat } = api.bottleFormat.getAll.useQuery();
  const { data: wineColor } = api.color.getAll.useQuery();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormValues>();

  const createWineMutation = api.wines.create.useMutation();

  const onSubmit = (data: TFormValues) => {
    if (sessionData && bottleFormat) {
      const wineBottles: WineBottleProps["wineBottles"] = [];

      data.formats?.forEach((formatId: string) => {
        const format = bottleFormat.find((f) => f.id.toString() === formatId);

        if (format) {
          wineBottles.push({
            quantity: data[`quantity_${formatId}`] || 1,
            price: data[`price_${formatId}`] || 1,
            format: {
              id: parseInt(formatId),
              capacity: format.capacity,
            },
          });
        }
      });

      const payload = {
        name: data.name,
        producer: data.producer,
        varietal: data.varietal,
        country: data.country,
        region: data.region,
        vintage: data.vintage,
        purchasedAt: data.purchasedAt,
        description: data.description,
        image: data.image || "/images/black_crows.jpg",
        servingTemperature: data.servingTemperature,
        ownerId: sessionData.user.id,
        wineColorId: parseInt(data.wineColorId),
        wineBottles: wineBottles,
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
    <CreateWineFormData
      handleFormSubmit={handleFormSubmit}
      control={control}
      wineColor={wineColor}
      bottleFormat={bottleFormat}
      formatsValue={formatsValue}
      setFormatsValue={setFormatsValue}
      setValue={setValue}
    />
  );
}

export default CreateWineFormLogic;
