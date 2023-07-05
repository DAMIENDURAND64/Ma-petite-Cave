import { Pagination } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { UseGetAllWines } from "~/pages/api/APICalls/wines";

const WineList = () => {
  const { data: sessionData } = useSession();
  const { data: wines, isLoading, error } = UseGetAllWines();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [sortOption, setSortOption] = useState<string | null>(null);
  const Queries = ["vintage", "nom croissant", "nom décroissant"];

  const pageSize = 10;

  const startingIndex = (pageNumber - 1) * pageSize;

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  let sortedWines = wines ?? [];
  if (sortOption) {
    sortedWines = [...(wines ?? [])].sort((a, b) => {
      if (sortOption === "vintage") {
        return a.vintage - b.vintage;
      } else if (sortOption === "nom croissant") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "nom décroissant") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  const pageData = sortedWines?.slice(startingIndex, startingIndex + pageSize);

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

  if (error) {
    return (
      <div className="xy-center flex h-full w-full">
        <h1>Vous n&apos;avez pas encore de vin dans votre cave</h1>
      </div>
    );
  }

  return (
    <div className="flexcol gap-3">
      <HeaderPage
        colors=""
        loading={isLoading}
        label="Ma Cave"
        queries={Queries}
        onSortChange={handleSortChange}
        sortFilter
      />
      <div className="mx-6">
        <WineListTemplate wines={pageData} loading={isLoading} />
      </div>
      <div className="x-center mt-3 flex w-full">
        <div className="w-10/12">
          <Pagination
            total={Math.ceil(wines.length / pageSize)}
            onChange={handlePageChange}
            withEdges
            siblings={2}
            radius="md"
            size="md"
            align="center"
            styles={(theme) => ({
              control: {
                "&[data-active]": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.violet[9]
                      : theme.colors.violet[6],
                },
              },
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default WineList;
