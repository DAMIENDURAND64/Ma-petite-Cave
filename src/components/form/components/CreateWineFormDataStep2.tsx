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
import { type TFormValues } from "../CreateWineFormLogic";

type CreateWineFormDataProps = {
  handleFormSubmit: (e: React.FormEvent) => void;
  control: Control<TFormValues>;
  setFile: (files: File) => void;
  file: File | null;
};

function CreateWineFormDataStep2({
  handleFormSubmit,
  control,
  setFile,
  file,
}: CreateWineFormDataProps) {
  return (
    <div className="w-5/6">
      <form onSubmit={handleFormSubmit}>
        <Container>
          <Flex direction="column" gap="lg">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            {file && (
              <Image
                radius="md"
                src={URL.createObjectURL(file)}
                alt="uploaded image"
              />
            )}

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  defaultValue=""
                  label="Description"
                  minRows={4}
                  autosize
                />
              )}
            />
          </Flex>
        </Container>
      </form>
    </div>
  );
}

export default CreateWineFormDataStep2;
