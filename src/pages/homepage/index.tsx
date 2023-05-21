import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RiAddCircleFill } from "react-icons/ri";
import CarouselWine from "~/components/carousels/CarouselWine";
import SearchBar from "~/components/searchBar/searchBar";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { api } from "~/utils/api";
import { Colors } from "~/utils/colors/Colors";

function Homepage() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: wineColor = [], error: wineColorError } =
    api.color.getAll.useQuery();
  const { data: wines = [], error: wineError } = api.wines.getAll.useQuery();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (wineColorError || wineError) {
    return <div>No Data available</div>;
  }

  const handleNavigationAddWine = () => {
    router.push("/wines/add").catch((err) => console.log(err));
  };

  return (
    <div className="w-full overflow-y-auto">
      <SearchBar wineData={wines} />
      <CarouselWine
        colors={Colors}
        colorData={wineColor}
        height="80px"
        controlsProps="10px"
      />
      {wines.length > 0 ? (
        <CarouselWine
          colors={Colors}
          wineData={wines}
          height="300px"
          controlsProps="10px"
        />
      ) : (
        <div className="flexcol xy-center gap-2 pt-10 text-center text-2xl font-bold">
          Aucun vin en cave
          <RiAddCircleFill size="3rem" onClick={handleNavigationAddWine} />
        </div>
      )}
    </div>
  );
}

export default Homepage;
