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
import { useGetAllBottlesFormat } from "~/utils/APICalls/bottleFormat";
import { useGetAllWineColor } from "~/utils/APICalls/wineColor";

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

  const { data: bottleFormat } = useGetAllBottlesFormat();
  const { data: wineColor } = useGetAllWineColor();

  const methods = useForm<TFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const createWineMutation = api.wines.create.useMutation();

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    setLoading(true);

    if (sessionData && bottleFormat) {
      let imageUrl = "/images/black_crows.jpg";
      if (file) {
        console.log(file);
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

          wineBottles.push({
            quantity: quantity || 1,
            price: price || 1,
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
