import { MultiSelect } from "@mantine/core";
import React from "react";
import { type TFormValues } from "../FormType";
import { type BottleFormat } from "@prisma/client";
import {
  type Control,
  type FieldErrors,
  Controller,
  type UseFormWatch,
} from "react-hook-form";
import WineBottleForm from "./WineBottleFormatForm";

type WineFormStep2Props = {
  bottleFormat?: BottleFormat[];
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  watch: UseFormWatch<TFormValues>;
};

const WineFormStep2 = ({
  bottleFormat,
  control,
  errors,
  watch,
}: WineFormStep2Props) => {
  const selectedFormats = watch("formats");

  return (
    <div className="flexcol gap-4 px-3">
      {bottleFormat && (
        <Controller
          name="formats"
          control={control}
          render={({ field }) => (
            <MultiSelect
              data={bottleFormat?.map((format) => ({
                value: format.id.toString(),
                label: `${format.name} (${format.capacity})`,
              }))}
              label="Formats"
              placeholder="Select formats"
              transitionProps={{
                duration: 150,
                transition: "pop-top-left",
                timingFunction: "ease",
              }}
              searchable
              {...field}
              onChange={(value) => field.onChange(value)}
              error={errors.formats?.message}
            />
          )}
        />
      )}
      <div>
        {selectedFormats?.map((formatId: string) => {
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
