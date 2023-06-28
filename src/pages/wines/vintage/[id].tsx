import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { useGetAllWineByVintage } from "~/pages/api/APICalls/wines";

const VintagePage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const {
    data: wineListData,
    error,
    isLoading,
  } = useGetAllWineByVintage(parseInt(id as unknown as string));

  if (sessionData === null) {
    return <Unauthorized />;
  }
  if (error) {
    return <div>error</div>;
  }
  if (isLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  return (
    <div className="flexcol gap-3">
      <HeaderPage colors="" label={id as string} loading={isLoading} />
      <div className="mx-5">
        <WineListTemplate wines={wineListData} />
      </div>
    </div>
  );
};

export default VintagePage;
