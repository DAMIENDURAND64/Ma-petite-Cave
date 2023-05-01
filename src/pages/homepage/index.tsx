import { useSession } from "next-auth/react";
import CarouselWine from "~/components/carousels/CarouselWine";
import { api } from "~/utils/api";

function Homepage() {
  const { data: sessionData } = useSession();
  const { data: wineColor = [] } = api.color.getAll.useQuery();
  const { data: wines = [] } = api.wines.getAll.useQuery();

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }

  const colors = {
    1: "bg-gradient-to-r from-red-900 to-red-500",
    2: "bg-gradient-to-r from-rose-600 to-rose-300",
    3: "bg-gradient-to-r from-yellow-300 to-yellow-100",
    4: "bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-900",
    5: "bg-gradient-to-r from-amber-900 to-amber-500",
    6: "bg-gradient-to-r from-green-900 to-green-500",
  };

  return (
    <div className="h-screen overflow-y-auto p-3">
      <CarouselWine
        colors={colors}
        colorData={wineColor}
        height="80px"
        controlsProps="10px"
      />
      <CarouselWine
        colors={colors}
        wineData={wines}
        controlsProps="100px"
        height="292px"
      />
    </div>
  );
}

export default Homepage;
