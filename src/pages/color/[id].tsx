import type { Wine } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Color = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

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

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }
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
