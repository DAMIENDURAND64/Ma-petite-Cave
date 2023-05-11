import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Button, Group, Stepper, useMantineTheme } from "@mantine/core";
import CreateWineFormDataStep1 from "./components/CreateWineFormDataStep1";
import CreateWineFormDataStep2 from "./components/CreateWineFormDataStep2";
import { type FileWithPath } from "@mantine/dropzone";

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
  const theme = useMantineTheme();
  const { data: sessionData } = useSession();
  const [formatsValue, setFormatsValue] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const nextStep = () =>
    setActive((current) => (current < 1 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
    console.log(data);
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
    <div className="flexcol w-full px-3">
      <Stepper
        active={active}
        onStepClick={setActive}
        radius="md"
        color="violet"
      >
        <Stepper.Step>
          <div className="flexcol y-center">
            <CreateWineFormDataStep1
              handleFormSubmit={handleFormSubmit}
              control={control}
              wineColor={wineColor}
              bottleFormat={bottleFormat}
              formatsValue={formatsValue}
              setFormatsValue={setFormatsValue}
              setValue={setValue}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step>
          <div className="flexcol y-center">
            <CreateWineFormDataStep2
              handleFormSubmit={handleFormSubmit}
              control={control}
              setFiles={setFiles}
              files={files}
            />
          </div>
        </Stepper.Step>
      </Stepper>
      <Group position="center" mt="xl" spacing="xl">
        <Button
          onClick={prevStep}
          disabled={active === 0}
          style={{ backgroundColor: theme.colors.violet[9] }}
        >
          Back
        </Button>
        {active === 1 ? (
          <Button
            type="submit"
            onClick={handleFormSubmit}
            style={{
              backgroundImage: theme.fn.gradient({
                from: "teal",
                to: "lime",
                deg: 45,
              }),
            }}
          >
            Add
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            style={{
              backgroundColor: theme.colors.violet[9],
            }}
          >
            Next step
          </Button>
        )}
      </Group>
    </div>
  );
}

export default CreateWineFormLogic;
