/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

import { uploadFileToCloud } from "~/utils/cloudinary";
import StepperForm from "./components/StepperForm";
import { type TFormValues, type WineBottleProps } from "./FormType";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./components/ValidationSchema";

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

  const methods = useForm<TFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const createWineMutation = api.wines.create.useMutation();

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    console.log(data);
    setLoading(true);

    if (sessionData && bottleFormat) {
      let imageUrl = "/images/black_crows.jpg";
      if (file) {
        try {
          imageUrl = await uploadFileToCloud(file);
        } catch (err) {
          console.log(err);
        }
      }

      const wineBottles: WineBottleProps["wineBottles"] = [];

      data.formats?.forEach((formatId: string) => {
        const format = bottleFormat.find((f) => f.id.toString() === formatId);

        if (format) {
          const quantity = data[`quantity_${formatId}`];
          const price = data[`price_${formatId}`];

          if (quantity === undefined || price === undefined) {
            setError(`quantity_${formatId}`, {
              type: "required",
              message: "Quantity is required",
            });
            setError(`price_${formatId}`, {
              type: "required",
              message: "Price is required",
            });
            setLoading(false);
            return;
          }
          if (quantity <= 0 || price <= 0) {
            setError(`quantity_${formatId}`, {
              type: "min",
              message: "Quantity must be greater than 0",
            });
            setError(`price_${formatId}`, {
              type: "min",
              message: "Price must be greater than 0",
            });
            setLoading(false);
            return;
          }

          wineBottles.push({
            quantity: quantity,
            price: price,
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
      console.log(payload, "payload");
      try {
        await createWineMutation.mutateAsync(payload);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return;
      }
    }

    setLoading(false);

    try {
      await router.push("/wines");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-3">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            watch={watch}
            getValues={getValues}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateWineFormLogic;
