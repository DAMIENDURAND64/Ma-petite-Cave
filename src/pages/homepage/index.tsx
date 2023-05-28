import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RiAddCircleFill } from "react-icons/ri";
import CarouselWine from "~/components/carousels/CarouselWine";
import { LoaderRing } from "~/components/loader/loaderRing";
import SearchBar from "~/components/searchBar/searchBar";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { useGetAllBottlesFormat } from "~/utils/APICalls/bottleFormat";
import { useGetAllWineColor } from "~/utils/APICalls/wineColor";
import { UseGetAllWines } from "~/utils/APICalls/wines";
import { Colors } from "~/utils/colors/Colors";

function Homepage() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const {
    data: wineColor = [],
    isLoading: wineColorLoading,
    error: wineColorError,
  } = useGetAllWineColor();

  const {
    data: wineBottlesFormat = [],
    isLoading: wineBottlesFormatLoading,
    error: wineBottlesFormatError,
  } = useGetAllBottlesFormat();

  const {
    data: wines = [],
    isLoading: winesLoading,
    error: wineError,
  } = UseGetAllWines();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (wineColorError || wineError || wineBottlesFormatError) {
    return <div>No Data available</div>;
  }

  const handleNavigationAddWine = () => {
    router.push("/wines/add").catch((err) => console.log(err));
  };

  if (wineColorLoading || winesLoading || wineBottlesFormatLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }
  return (
    <div className="flexcol w-full gap-4 overflow-y-auto">
      {/*    <SearchBar
        wineData={wines}
        winesBottleData={wineBottlesFormat}
        winesColorData={wineColor}
      /> */}
      <CarouselWine colors={Colors} colorData={wineColor} />
      {wines.length > 0 ? (
        <CarouselWine colors={Colors} wineData={wines} />
      ) : (
        <div className="flexcol xy-center gap-2 pt-10 text-center text-2xl font-bold">
          Aucun vin en cave
          <RiAddCircleFill size="3rem" onClick={handleNavigationAddWine} />
        </div>
      )}
      <CarouselWine wineBottlesFormat={wineBottlesFormat} />
    </div>
  );
}

export default Homepage;
