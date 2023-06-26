import { Pagination, Skeleton, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import React, { useState } from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { UseGetAllWines } from "~/pages/api/APICalls/wines";

const WineList = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const router = useRouter();
  const { data: wines, isLoading, error } = UseGetAllWines();
  const dark = theme.colorScheme === "dark";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 10;

  const startingIndex = (pageNumber - 1) * pageSize;
  const pageData = wines?.slice(startingIndex, startingIndex + pageSize);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

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
      <Skeleton visible={isLoading}>
        <div className="flex gap-2">
          <NavigationButton
            size="sm"
            radius="md"
            label="retour"
            onClick={() => {
              router.push("/homepage").catch((err) => console.log(err));
            }}
          />

          <div
            className={`xy-center flex h-[26px] w-full rounded-md ${
              dark ? "bg-[#2C2E33]" : "bg-[#DEE2E6]"
            }`}
          >
            <h1 className="text-lg">Ma Cave</h1>
          </div>
        </div>
      </Skeleton>
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
