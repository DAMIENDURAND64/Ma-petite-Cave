import { useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { UseGetMe } from "~/utils/APICalls/user";

function Profil() {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();

  const { data: me, isLoading, error } = UseGetMe();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (isLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  if (error) {
    return <div>something wrong happened</div>;
  }
  return (
    <div className="xy-center flexcol gap-5 p-3">
      <h1>Profil</h1>
      <Image
        src={sessionData?.user.image as string}
        alt="avatar"
        width={100}
        height={100}
        className="rounded-full"
      />

      <div className="h-14 w-fit rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px] shadow-2xl">
        <div
          className="flex h-full w-full items-center justify-around gap-2 rounded-xl px-2"
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
          }}
        >
          Nom :
          <div className="w-fit rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-2 font-sans">
            {me?.name as string}
          </div>
        </div>
      </div>
      <div className="h-14 w-fit rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px] shadow-2xl">
        <div
          className="flex h-full w-full items-center justify-around gap-2 rounded-xl px-2"
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
          }}
        >
          Mail :
          <div className="w-fit rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-2 font-sans">
            {me?.email as string}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
