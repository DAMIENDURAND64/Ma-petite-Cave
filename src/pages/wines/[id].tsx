import {
  type Color,
  type TastingNote,
  type Wine,
  type WineBottle,
} from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { api } from "~/utils/api";
import { Colors } from "~/utils/colors/Colors";

function GetOneWine() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const wineId = parseInt(id as string, 10);

  const { data: wineQuery, isLoading } = api.wines.getOne.useQuery(
    { id: wineId },
    {
      enabled: !!id,
    }
  );

  const wine:
    | (Wine & {
        wineColor: Color;
        wineBottles: (WineBottle & {
          format: { name: string; capacity: string };
        })[];
        tastingNotes: TastingNote[];
      })
    | null
    | undefined = wineQuery;

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (isLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  const wineColorId: number | undefined = wine?.wineColorId;
  const coloor: string =
    Colors[wineColorId !== undefined ? wineColorId : 0] ?? "bg-gray-500";

  if (!wine) return <div>loading...</div>;

  return (
    <div className="flexcol gap-3">
      <div className="flex gap-2">
        <NavigationButton
          size="sm"
          label="retour"
          radius="md"
          onClick={() => {
            router.push("/wines").catch((err) => console.log(err));
          }}
        />
        <div className={`${coloor} xy-center flex h-[26px] w-full rounded-md`}>
          <h1 className="text-lg">{wine?.wineColor?.name}</h1>
        </div>
      </div>
      <div className="flexcol xy-center mx-3">
        <Image
          src={wine?.image || "/images/wine.png"}
          alt="wine image"
          width={200}
          height={200}
          className="rounded-md"
        />
      </div>
      <div className="flexcol m-3 gap-2">
        <h2>{`Nom: ${wine.name.toUpperCase()}`}</h2>
        <div className="y-center flex gap-3">
          <p>{`Producteur: ${wine?.producer}`}</p>
        </div>
        <p>{`Pays: ${wine.country}`}</p>
        <p>{`Region: ${wine.region}`}</p>
        <p>{`Millésime: ${wine.vintage}`}</p>
        <p>{`Cépage(s): ${
          wine.varietal.length === 0
            ? "aucun cepage(s) selectionné(s)"
            : (wine.varietal as unknown as string)
        }`}</p>
        <p>{`T° idéale: ${wine.servingTemperature || "pas de données"}°`}</p>
        <p>{`Date d'achat: ${
          wine.purchasedAt
            ? wine.purchasedAt.toLocaleDateString()
            : "pas de date"
        }`}</p>
        <p>{`Description: ${wine.description || "pas de description"}`}</p>

        <div className="flex flex-wrap gap-3">
          {wine.wineBottles.map((wineBottle) => (
            <div
              className="w-fit rounded-md bg-slate-500 p-3"
              key={wineBottle.id}
            >
              <h3 className="text-lg font-semibold text-white">{`${wineBottle.format.name} (${wineBottle.format.capacity})`}</h3>
              <p className="text-white">{`${
                wineBottle.quantity > 1 ? "quantités" : "quantité"
              } : ${wineBottle.quantity}`}</p>
              <p className="text-white">{`prix:  ${wineBottle.price}€ /b`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetOneWine;
