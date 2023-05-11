import {
  Container,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Textarea,
} from "@mantine/core";
import React from "react";
import { type Control, Controller } from "react-hook-form";
import { type TFormValues } from "../CreateWineFormLogic";
import {
  Dropzone,
  type FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";

type CreateWineFormDataProps = {
  handleFormSubmit: (e: React.FormEvent) => void;
  control: Control<TFormValues>;
  setFiles: (files: FileWithPath[]) => void;
  files: FileWithPath[];
};

function CreateWineFormDataStep2({
  handleFormSubmit,
  control,
  setFiles,
  files,
}: CreateWineFormDataProps) {
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);
    return (
      <Controller
        name="image"
        key={index}
        control={control}
        render={({ field }) => (
          <Image
            {...field}
            radius="md"
            src={imageUrl}
            alt="uploaded image"
            imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          />
        )}
      />
    );
  });

  return (
    <div className="w-5/6">
      <form onSubmit={handleFormSubmit}>
        <Container>
          <Flex direction="column" gap="lg">
            <>
              <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                <Text align="center">Drop images here</Text>
              </Dropzone>
              <SimpleGrid>{previews}</SimpleGrid>
            </>

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
