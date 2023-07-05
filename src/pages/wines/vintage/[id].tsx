import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { useGetAllWineByVintage } from "~/pages/api/APICalls/wines";

const VintagePage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [sortOption, setSortOption] = useState<string | null>(null);
  const Queries = ["nom croissant", "nom décroissant"];

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

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  let sortedWines = wineListData ?? [];
  if (sortOption) {
    sortedWines = [...(wineListData ?? [])].sort((a, b) => {
      if (sortOption === "nom croissant") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "nom décroissant") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  return (
    <div className="flexcol gap-3">
      <HeaderPage
        colors=""
        label={id as string}
        loading={isLoading}
        queries={Queries}
        onSortChange={handleSortChange}
        sortFilter
      />
      <div className="mx-5">
        <WineListTemplate wines={sortedWines} />
      </div>
    </div>
  );
};

export default VintagePage;
