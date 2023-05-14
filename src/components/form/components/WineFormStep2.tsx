import { MultiSelect } from "@mantine/core";
import React, { type Dispatch } from "react";
import { type TFormValues } from "../FormType";
import { type BottleFormat } from "@prisma/client";
import {
  type UseFormSetValue,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import WineBottleForm from "./WineBottleFormatForm";

type WineFormStep2Props = {
  bottleFormat?: BottleFormat[];
  control: Control<TFormValues>;
  formatsValue: string[];
  setValue: UseFormSetValue<TFormValues>;
  setFormatsValue: Dispatch<React.SetStateAction<string[]>>;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
};

const WineFormStep2 = ({
  bottleFormat,
  control,
  formatsValue,
  setFormatsValue,
  setValue,
  errors,
  register,
}: WineFormStep2Props) => {
  return (
    <div className="w-5/6">
      {bottleFormat && (
        <MultiSelect
          {...register("formats")}
          data={bottleFormat?.map((format) => ({
            value: format.id.toString(),
            label: `${format.name} (${format.capacity})`,
          }))}
          label="Formats"
          placeholder={
            errors.formats ? errors.formats.message : "Select formats"
          }
          transitionProps={{
            duration: 150,
            transition: "pop-top-left",
            timingFunction: "ease",
          }}
          searchable
          defaultValue={[]}
          value={formatsValue}
          onChange={(value) => {
            setFormatsValue(value);
            setValue("formats", value);
          }}
          error={!!errors.formats}
        />
      )}
      <div className="mt-5">
        {formatsValue?.map((formatId: string) => {
          const format = bottleFormat?.find(
            (f) => f.id.toString() === formatId
          );
          const formatName = format
            ? `${format.name} (${format.capacity})`
            : "Unknown";
          return (
            <div key={formatId} className="my-2">
              <WineBottleForm
                control={control}
                key={formatId}
                formatId={formatId}
                formatName={formatName}
                errors={errors}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WineFormStep2;
