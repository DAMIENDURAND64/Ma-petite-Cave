import React, { type Dispatch } from "react";
import { Button, Group, Stepper, useMantineTheme } from "@mantine/core";
import {
  type FieldErrors,
  type Control,
  type UseFormSetValue,
  type UseFormRegister,
} from "react-hook-form";
import { type BottleFormat, type Color } from "@prisma/client";
import WineFormStep2 from "./WineFormStep2";
import WineFormStep3 from "./WineFormStep3";
import WineFormStep1 from "./WineFormStep1";
import { type TFormValues } from "../FormType";

type StepperFormProps = {
  formatsValue: string[];
  setFormatsValue: Dispatch<React.SetStateAction<string[]>>;
  control: Control<TFormValues>;
  wineColor?: Color[];
  bottleFormat?: BottleFormat[];
  setValue: UseFormSetValue<TFormValues>;
  nextStep: () => void;
  prevStep: () => void;
  setActive: Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  file: File | null;
  active: number;
  setFile: (files: File) => void;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
};

const StepperForm = ({
  formatsValue,
  setFormatsValue,
  control,
  wineColor,
  bottleFormat,
  setValue,
  nextStep,
  prevStep,
  setActive,
  loading,
  file,
  setFile,
  active,
  errors,
  register,
}: StepperFormProps) => {
  const theme = useMantineTheme();

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
            <WineFormStep1
              control={control}
              wineColor={wineColor}
              errors={errors}
              register={register}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step>
          <div className="flexcol y-center">
            <WineFormStep2
              bottleFormat={bottleFormat}
              setValue={setValue}
              formatsValue={formatsValue}
              control={control}
              setFormatsValue={setFormatsValue}
              errors={errors}
              register={register}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step>
          <div className="flexcol y-center">
            <WineFormStep3
              control={control}
              setFile={setFile}
              file={file}
              errors={errors}
              register={register}
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
        {active === 2 && (
          <Button
            type="submit"
            style={{
              backgroundImage: theme.fn.gradient({
                from: "teal",
                to: "lime",
                deg: 45,
              }),
            }}
            loading={loading}
          >
            Add
          </Button>
        )}
        <Button
          onClick={nextStep}
          style={{
            backgroundColor: theme.colors.violet[9],
            display: active === 2 ? "none" : "block",
          }}
        >
          Next step
        </Button>
      </Group>
    </div>
  );
};

export default StepperForm;
