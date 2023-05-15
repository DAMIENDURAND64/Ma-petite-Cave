/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

import { uploadFileToCloud } from "~/utils/cloudinary";
import StepperForm from "./components/StepperForm";
import { type TFormValues, type WineBottleProps } from "./FormType";
import { useRouter } from "next/router";

const CreateWineFormLogic = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
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
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region is required"),
    vintage: Yup.number()
      .required("Vintage is required")
      .test("len", "Max 4 numbers", (val) => val.toString().length <= 4),
    purchasedAt: Yup.date().required("Purchased at is required"),
    description: Yup.string().required("Description is required"),
    servingTemperature: Yup.string().required(
      "Serving temperature is required"
    ),
    formats: Yup.array().of(Yup.string().required("Format is required")),
    wineColorId: Yup.string().required("Color is required"),
  });

  const methods = useForm<TFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

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
      createWineMutation.mutate(payload);
    }
    setLoading(false);
  };
  const handleFormSubmit = async () => {
    await handleSubmit(onSubmit)();
    await router.push("/homepage");
  };
  return (
    <div className="w-full p-3">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            file={file}
            errors={errors}
            register={register}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateWineFormLogic;
