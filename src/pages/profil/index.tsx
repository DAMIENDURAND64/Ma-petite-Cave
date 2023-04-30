import { Paper } from "@mantine/core";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

function Profil() {
  const { data: sessionData } = useSession();

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
    <div className="xy-center flexcol gap-2 p-3">
      <h1>Profil</h1>
      <Image
        src={sessionData?.user.image as string}
        alt="avatar"
        width={100}
        height={100}
        className="rounded-full"
      />

      <Paper radius="lg" p="xs" w={300} display="flex" withBorder shadow="lg">
        Nom complet :
        <Paper radius="lg" p="xs" withBorder>
          {me.data?.name as string}
        </Paper>
      </Paper>
      <div className="flex w-5/6 items-center justify-around gap-1 rounded-xl border border-indigo-700 p-1 ">
        Nom complet
        <div className="rounded-xl  bg-gradient-to-r from-indigo-500 to-purple-500  p-2">
          {me.data?.name as string}
        </div>
      </div>

      <Paper radius="lg" p="xs" withBorder style={{ marginTop: 8 }}>
        {me.data?.email as string}
      </Paper>
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
