import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { useGetOneBottleFormat } from "~/pages/api/APICalls/bottleFormat";
import { useGetAllWineByFormat } from "~/pages/api/APICalls/wines";

const BottleFormatPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const wineBottleFormatId = parseInt(id as string, 10);

  const {
    data: wineListData,
    error,
    isLoading,
  } = useGetAllWineByFormat(wineBottleFormatId);

  const {
    data: BottleFormat,
    error: errorBottleFormat,
    isLoading: isLoadingBottleFormat,
  } = useGetOneBottleFormat(wineBottleFormatId);

  if (sessionData === null) {
    return <Unauthorized />;
  }
  if (error || errorBottleFormat) {
    return <div>error</div>;
  }
  if (isLoading || isLoadingBottleFormat) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  const formatName = BottleFormat
    ? `${BottleFormat.name} (${BottleFormat.capacity})`
    : "Unknown";

  return (
    <div className="flexcol gap-3">
      <HeaderPage colors="" loading={isLoading} label={formatName} />
      <div className="mx-5">
        <WineListTemplate wines={wineListData} />
      </div>
    </div>
  );
};

export default BottleFormatPage;
