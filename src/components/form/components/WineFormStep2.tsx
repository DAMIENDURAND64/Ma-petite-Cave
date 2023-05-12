import { MultiSelect } from "@mantine/core";
import React, { type Dispatch } from "react";
import { type TFormValues } from "../WineFormLogic";
import { type BottleFormat } from "@prisma/client";
import { type UseFormSetValue, type Control } from "react-hook-form";
import WineBottleForm from "./WineBottleFormatForm";

type WineFormStep2Props = {
  handleFormSubmit: (e: React.FormEvent) => void;
  bottleFormat?: BottleFormat[];
  control: Control<TFormValues>;
  formatsValue: string[];
  setValue: UseFormSetValue<TFormValues>;
  setFormatsValue: Dispatch<React.SetStateAction<string[]>>;
};

const WineFormStep2 = ({
  handleFormSubmit,
  bottleFormat,
  control,
  formatsValue,
  setFormatsValue,
  setValue,
}: WineFormStep2Props) => {
  return (
    <div className="w-5/6">
      <form onSubmit={handleFormSubmit}>
        {bottleFormat && (
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
            defaultValue={[]}
            value={formatsValue}
            onChange={(value) => {
              setFormatsValue(value);
              setValue("formats", value);
            }}
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
                />
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default WineFormStep2;
