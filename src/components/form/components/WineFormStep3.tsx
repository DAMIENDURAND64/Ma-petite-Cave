import {
  Button,
  Container,
  FileButton,
  Flex,
  Image,
  Textarea,
} from "@mantine/core";
import React from "react";
import { type Control, Controller } from "react-hook-form";
import { type TFormValues } from "../WineFormLogic";

type CreateWineFormDataProps = {
  handleFormSubmit: (e: React.FormEvent) => void;
  control: Control<TFormValues>;
  setFile: (files: File) => void;
  file: File | null;
};

function WineFormStep3({
  handleFormSubmit,
  control,
  setFile,
  file,
}: CreateWineFormDataProps) {
  return (
    <div className="w-5/6">
      <form onSubmit={handleFormSubmit}>
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
                radius="md"
                src={URL.createObjectURL(file)}
                alt="uploaded image"
              />
            )}

            <Controller
              rules={{
                required: "Description is required",
              }}
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  minRows={4}
                  autosize
                  style={{
                    width: "100%",
                  }}
                />
              )}
            />
          </Flex>
        </Container>
      </form>
    </div>
  );
}

export default WineFormStep3;
