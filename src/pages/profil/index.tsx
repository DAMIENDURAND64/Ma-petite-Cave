import { Avatar, Box, Input, Paper } from "@mantine/core";
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
      <Paper radius="lg" p="xs" withBorder style={{ marginTop: 8 }}>
        {me.data?.name as string}
      </Paper>
    </div>
  );
}

export default Profil;
