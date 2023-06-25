import { Button, FileButton, Textarea } from "@mantine/core";
import React from "react";
import { type WineFormStep3Props } from "../FormType";
import Image from "next/image";

function WineFormStep3({
  setFile,
  file,
  errors,
  register,
  theme,
}: WineFormStep3Props) {
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
        <div
          className={`h-56 max-h-56 w-full rounded-md border border-dashed border-${
            theme.colorScheme === "dark" ? "[#373A40]" : "[#ced4da]"
          } `}
        />
      )}
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => (
          <Button
            style={{
              width: "150px",
            }}
            variant="outline"
            {...props}
            styles={(theme) => ({
              root: {
                border: `2px solid ${
                  theme.colorScheme === "dark"
                    ? `${theme.colors.violet[9]} !important`
                    : `${theme.colors.violet[6]} !important`
                }}`,
              },
              inner: {
                color: `${
                  theme.colorScheme === "dark"
                    ? `${theme.colors.violet[9]} !important`
                    : `${theme.colors.violet[6]} !important`
                }`,
              },
            })}
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
