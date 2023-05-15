import { Button, FileButton, Textarea } from "@mantine/core";
import React from "react";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { type TFormValues } from "../FormType";
import Image from "next/image";

type CreateWineFormDataProps = {
  control: Control<TFormValues>;
  setFile: (files: File) => void;
  file: File | null;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
};

function WineFormStep3({
  setFile,
  file,
  errors,
  register,
}: CreateWineFormDataProps) {
  return (
    <div className="flexcol xy-center gap-4 px-3">
      {file ? (
        <div className="min-h-56 max-h-56 w-full">
          <Image
            {...register("image")}
            src={URL.createObjectURL(file)}
            alt="uploaded image"
            width={500}
            height={200}
            className="h-56 w-full rounded-md object-fill"
          />
        </div>
      ) : (
        <div className="h-56 max-h-56 w-full rounded-md border border-dashed border-purple-600" />
      )}
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => (
          <Button
            style={{
              width: "150px",
            }}
            variant="outline"
            color="violet"
            {...props}
          >
            Upload image
          </Button>
        )}
      </FileButton>
      <Textarea
        {...register("description")}
        label="Description"
        minRows={4}
        autosize
        style={{
          width: "100%",
        }}
        error={!!errors.description}
        placeholder={
          errors.description
            ? errors.description.message
            : "This wine is a blend of 50% Syrah and 50% Cabernet Sauvignon. It is a full-bodied wine with a deep ruby color. It has a complex nose of black fruits...."
        }
      />
    </div>
  );
}

export default WineFormStep3;
