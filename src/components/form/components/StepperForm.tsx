import React, { type Dispatch } from "react";
import {
  Button,
  Group,
  Stepper,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
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
import { IconCircleX } from "@tabler/icons-react";

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

const stepperStyle = createStyles((theme) => ({
  error: {
    ".mantine-ttrh0a": {
      backgroundColor: `${theme.colors.red[4]} !important`,
    },
  },
  background: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.violet[9]} !important`
        : `${theme.colors.violet[6]} !important`,
  },
  borderColor: {
    borderColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.violet[9]} !important`
        : `${theme.colors.violet[6]} !important`,
  },
}));

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

  const { classes } = stepperStyle();

  const hasErrors = Object.values(errors).some((error) => !!error);

  const hasErrorsStep1 =
    hasErrors &&
    (errors.name ||
      errors.producer ||
      errors.country ||
      errors.region ||
      errors.wineColorId ||
      errors.vintage ||
      errors.purchasedAt ||
      errors.servingTemperature);

  return (
    <div>
      <Stepper
        active={active}
        onStepClick={setActive}
        radius="md"
        color="violet"
        className={hasErrors ? classes.error : ""}
      >
        <Stepper.Step
          color={
            hasErrorsStep1
              ? "red"
              : theme.colorScheme === "dark"
              ? theme.colors.violet[9]
              : theme.colors.violet[6]
          }
          completedIcon={hasErrorsStep1 ? <IconCircleX /> : ""}
        >
          <WineFormStep1
            control={control}
            wineColor={wineColor}
            errors={errors}
            register={register}
          />
        </Stepper.Step>
        <Stepper.Step
          color={
            errors.formats
              ? "red"
              : theme.colorScheme === "dark"
              ? theme.colors.violet[9]
              : theme.colors.violet[6]
          }
          completedIcon={errors.formats && <IconCircleX />}
        >
          <WineFormStep2
            bottleFormat={bottleFormat}
            setValue={setValue}
            formatsValue={formatsValue}
            control={control}
            setFormatsValue={setFormatsValue}
            errors={errors}
            register={register}
          />
        </Stepper.Step>
        <Stepper.Step
          color={
            errors.description
              ? "red"
              : theme.colorScheme === "dark"
              ? theme.colors.violet[9]
              : theme.colors.violet[6]
          }
          completedIcon={errors.description && <IconCircleX />}
        >
          <WineFormStep3
            control={control}
            setFile={setFile}
            file={file}
            errors={errors}
            register={register}
            theme={theme}
          />
        </Stepper.Step>
      </Stepper>
      <Group position="center" mt="xl" spacing="xl">
        <Button
          onClick={prevStep}
          disabled={active === 0}
          className={classes.background}
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
            display: active === 2 ? "none" : "block",
          }}
          className={classes.background}
        >
          Next step
        </Button>
      </Group>
    </div>
  );
};

export default StepperForm;
