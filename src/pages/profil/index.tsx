import { Paper, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

function Profil() {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();

  const me = api.user.getOne.useQuery(
    { id: sessionData?.user.id as string },
    {
      enabled: !!sessionData?.user.id,
    }
  );

  const quantityAvailable = me.data?.wines
    .map((bottle) => bottle?.quantity ?? 0)
    .reduce((a, b) => a + b, 0);

  const totalConsumedQuantity = me.data?.wines
    .filter((wine) => wine.consumedAt !== null)
    .reduce((acc, wine) => acc + (wine.quantity ?? 0), 0);

  const valueCave = me.data?.wines
    .map((bottle) => (bottle?.unitPrice ?? 0) * (bottle?.quantity ?? 0))
    .reduce((a, b) => a + b, 0);

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
            {me.data?.name as string}
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
            {me.data?.email as string}
          </div>
        </div>
      </div>
      <Paper radius="lg" p="xs" withBorder style={{ marginTop: 8 }}>
        {`${quantityAvailable as number} bouteilles disponibles`}
      </Paper>
      <Paper radius="lg" p="xs" withBorder style={{ marginTop: 8 }}>
        {`${totalConsumedQuantity as number} bouteilles bues`}
      </Paper>
      <Paper radius="lg" p="xs" withBorder style={{ marginTop: 8 }}>
        {`Valeur de ma cave : ${valueCave as number} € `}
      </Paper>
    </div>
  );
}

export default Profil;
