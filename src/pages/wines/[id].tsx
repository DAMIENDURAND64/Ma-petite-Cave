import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { api } from "~/utils/api";

function GetOneWine() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const wineId = parseInt(id as string, 10);

  const wineQuery = api.wines.getOne.useQuery(
    { id: wineId },
    {
      enabled: !!id,
    }
  );

  const wine = wineQuery.data;

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }

  return (
    <div className="px-5">
      <div className="my-2">
        <NavigationButton
          label="retour"
          onClick={() => {
            router.push("/wines").catch((err) => console.log(err));
          }}
        />
      </div>
      <h1>Wine</h1>
      <p>{wine?.name}</p>
      <p>{wine?.producer}</p>
      <p>{wine?.varietal}</p>
      <p>{wine?.country}</p>
      <p>{wine?.region}</p>
      <p>{wine?.vintage}</p>
    </div>
  );
}

export default GetOneWine;
