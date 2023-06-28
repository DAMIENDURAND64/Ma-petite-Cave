import React from "react";
import NavigationButton from "../buttons/NavigationButton";
import { useRouter } from "next/router";
import { Skeleton } from "@mantine/core";
import { type HeaderPageProps } from "../type";

const HeaderPage = ({ colors, loading, label }: HeaderPageProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full">
      <Skeleton visible={loading}>
        <NavigationButton
          size="md"
          label="retour"
          radius="md"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
        />
      </Skeleton>
      <Skeleton visible={loading}>
        <div
          className={`${colors} xy-center flex h-[30px] min-w-[270px] rounded-md  bg-slate-500`}
        >
          <h1 className="text-lg">{label}</h1>
        </div>
      </Skeleton>
    </div>
  );
};

export default HeaderPage;
