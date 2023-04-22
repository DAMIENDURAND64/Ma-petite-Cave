import type { Wine } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import WelcomePage from "~/components/welcome/WelcomePage";
import { api } from "~/utils/api";

const Color = () => {
  const router = useRouter();

  const { id } = router.query;
  /*  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <div className="p-3">
        <WelcomePage />
      </div>
    );
  } */

  const wineColorQuery = api.wines.getAllByColor.useQuery(
    { colorId: id as string },
    {
      enabled: !!id,
    }
  );

  if (wineColorQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (wineColorQuery.error) {
    return <div>Error: {wineColorQuery.error.message}</div>;
  }

  const wineColor: Wine[] = wineColorQuery.data;

  return (
    <div>
      {wineColor.map((wine) => (
        <div key={wine.id}>
          <h1>{wine.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Color;
