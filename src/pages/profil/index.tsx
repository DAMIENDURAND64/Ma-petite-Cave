import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { LoaderRing } from "~/components/loader/loaderRing";
import ProfilDisplayInfo from "~/components/profil/profilDisplayInfo";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { UseGetMe } from "~/pages/api/APICalls/user";

function Profil() {
  const { data: sessionData } = useSession();

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
      <ProfilDisplayInfo label="Nom" value={me?.name as string} />
      <ProfilDisplayInfo label="Email" value={me?.email as string} />
      <ProfilDisplayInfo
        label="Date d'inscription"
        value={new Date(me?.createdAt as Date).toLocaleDateString()}
      />
    </div>
  );
}

export default Profil;
