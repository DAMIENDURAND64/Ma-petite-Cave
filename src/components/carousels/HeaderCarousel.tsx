import { Skeleton } from "@mantine/core";
import React from "react";
import NavigationButton from "../buttons/NavigationButton";
import { useRouter } from "next/router";

type Props = {
  loading: boolean;
  label: string;
};

const HeaderCarousel = ({ loading, label }: Props) => {
  const router = useRouter();
  return (
    <div className="mb-2 flex justify-between px-2">
      <div className="underline ">
        <Skeleton visible={loading}>{label}</Skeleton>
      </div>
      <div>
        <Skeleton visible={loading}>
          <NavigationButton
            size="sm"
            onClick={() => {
              router.push("/wines").catch((err) => console.log(err));
            }}
            label="Voir tous"
            radius="md"
          />
        </Skeleton>
      </div>
    </div>
  );
};

export default HeaderCarousel;
