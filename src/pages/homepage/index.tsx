import { useSession } from "next-auth/react";
import CarouselWine from "~/components/carousels/CarouselWine";
import { api } from "~/utils/api";
import { Colors } from "~/utils/colors/Colors";

function Homepage() {
  const { data: sessionData } = useSession();
  const { data: wineColor = [], isLoading: wineColorLoading } =
    api.color.getAll.useQuery();
  const { data: wines = [], isLoading: winesLoading } =
    api.wines.getAll.useQuery();

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-3">
      <CarouselWine
        colors={Colors}
        colorData={wineColor}
        height="80px"
        controlsProps="10px"
        loading={wineColorLoading}
      />
      <CarouselWine
        colors={Colors}
        wineData={wines}
        controlsProps="100px"
        height="292px"
        loading={winesLoading}
      />
    </div>
  );
}

export default Homepage;
