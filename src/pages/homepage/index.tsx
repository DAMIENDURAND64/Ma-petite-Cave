import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import CarouselWine from "~/components/carousels/CarouselWine";
import { api } from "~/utils/api";
import Trpc from "../api/trpc/[trpc]";

function Homepage() {
  const { data: sessionData } = useSession();
  const { data: wineColor = [], isLoading: wineColorLoading } =
    api.color.getAll.useQuery();
  const { data: wines = [], isLoading: winesLoading } =
    api.wines.getAll.useQuery();

  const loading = wineColorLoading || winesLoading;

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
        loading={false} // Set the loading prop to false
      />
      <CarouselWine
        colors={colors}
        wineData={wines}
        controlsProps="100px"
        height="292px"
        loading={false} // Set the loading prop to false
      />
    </div>
  );
}

export default Homepage;
