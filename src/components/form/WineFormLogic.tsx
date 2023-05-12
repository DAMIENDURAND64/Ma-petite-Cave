import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

import { uploadFileToCloud } from "~/utils/cloudinary";
import StepperForm from "./components/StepperForm";

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
  const [active, setActive] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { data: bottleFormat } = api.bottleFormat.getAll.useQuery();
  const { data: wineColor } = api.color.getAll.useQuery();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    producer: Yup.string().required("Producer is required"),
    varietal: Yup.string(),
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region is required"),
    vintage: Yup.number().required("Vintage is required"),
    purchasedAt: Yup.date().required("Purchased at is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
    servingTemperature: Yup.string().required(
      "Serving temperature is required"
    ),
    ownerId: Yup.string().required("Owner is required"),
    wineColorId: Yup.string().required("Color is required"),
    wineBottles: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number().required("Quantity is required"),
        price: Yup.number().required("Price is required"),
        format: Yup.object().shape({
          id: Yup.number().required("Format is required"),
          capacity: Yup.string().required("Capacity is required"),
        }),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const createWineMutation = api.wines.create.useMutation();

  const onSubmit = async (data: TFormValues) => {
    setLoading(true);

    if (sessionData && bottleFormat) {
      let imageUrl = "/images/black_crows.jpg";
      if (file) {
        imageUrl = await uploadFileToCloud(file);
      }

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
        image: imageUrl,
        servingTemperature: data.servingTemperature,
        ownerId: sessionData.user.id,
        wineColorId: parseInt(data.wineColorId),
        wineBottles: wineBottles,
      };

      console.log(payload);

      createWineMutation.mutate(payload);
    }
    setLoading(false);
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSubmit(onSubmit)();
  };
  return (
    <StepperForm
      bottleFormat={bottleFormat}
      formatsValue={formatsValue}
      setFormatsValue={setFormatsValue}
      active={active}
      setActive={setActive}
      setFile={setFile}
      loading={loading}
      nextStep={nextStep}
      prevStep={prevStep}
      wineColor={wineColor}
      control={control}
      setValue={setValue}
      handleFormSubmit={handleFormSubmit}
      file={file}
      errors={errors}
    />
  );
}

export default CreateWineFormLogic;
