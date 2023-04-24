import { useSession } from "next-auth/react";
import CarouselWineColor from "~/components/carousels/CarouselWineColor";
import CarouselWineList from "~/components/carousels/CarouselWineList";

function Homepage() {
  const { data: sessionData } = useSession();

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <CarouselWineColor />
      <CarouselWineList />
    </div>
  );
}

export default Homepage;
