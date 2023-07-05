import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { useGetAllWineByColor } from "~/pages/api/APICalls/wines";
import { Colors } from "~/utils/colors/Colors";

const Color = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { id } = router.query;
  const wineColorId = parseInt(id as string, 10);

  const [sortOption, setSortOption] = useState<string | null>(null);
  const Queries = ["vintage", "nom croissant", "nom décroissant"];

  const {
    data: wineColorQuery,
    error,
    isLoading,
  } = useGetAllWineByColor(wineColorId);

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

  let sortedWines = wineColorQuery ?? [];
  if (sortOption) {
    sortedWines = [...(wineColorQuery ?? [])].sort((a, b) => {
      if (sortOption === "vintage") {
        return a.vintage - b.vintage;
      } else if (sortOption === "nom croissant") {
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
        colors={Colors[wineColorId] as string}
        loading={isLoading}
        label={wineColorQuery?.[0]?.wineColor?.name}
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

export default Color;
