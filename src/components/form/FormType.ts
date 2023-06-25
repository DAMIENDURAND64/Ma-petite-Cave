import { type MantineTheme } from "@mantine/core";
import { type BottleFormat, type Color } from "@prisma/client";
import { type Dispatch } from "react";
import {
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

export interface WineBottleProps {
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

export type StepperFormProps = {
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
  getValues: UseFormGetValues<TFormValues>;
  watch: UseFormWatch<TFormValues>;
};

export type QuantityProps = {
  control: Control<TFormValues, unknown>;
  formatId: string;
  formatName: string;
  errors: FieldErrors<TFormValues>;
};

export type CreateWineFormDataProps = {
  control: Control<TFormValues>;
  wineColor?: Color[];
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
};

export type WineFormStep2Props = {
  bottleFormat?: BottleFormat[];
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  watch: UseFormWatch<TFormValues>;
};

export type WineFormStep3Props = {
  control: Control<TFormValues>;
  setFile: (files: File) => void;
  file: File | null;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  theme: MantineTheme;
};
