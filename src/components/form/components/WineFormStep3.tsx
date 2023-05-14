import {
  Button,
  Container,
  FileButton,
  Flex,
  Image,
  Textarea,
} from "@mantine/core";
import React from "react";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { type TFormValues } from "../FormType";

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
    <div className="w-5/6">
      <Container>
        <Flex direction="column" gap="lg" align="center">
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
          {file && (
            <Image
              {...register("image")}
              radius="md"
              src={URL.createObjectURL(file)}
              alt="uploaded image"
            />
          )}
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
                : "This wine is a blend of 50% Syrah and 50% Cabernet Sauvignon. It is a full-bodied wine with a deep ruby color. It has a complex nose of black fruits, spices, and leather. The palate is rich and powerful with a long finish."
            }
          />
        </Flex>
      </Container>
    </div>
  );
}

export default WineFormStep3;
