import { Skeleton, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { UseGetAllWines } from "~/utils/APICalls/wines";

const WineList = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const router = useRouter();
  const { data: wines, isLoading } = UseGetAllWines();
  const dark = theme.colorScheme === "dark";

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
        <WineListTemplate wines={wines} loading={isLoading} />
      </div>
    </div>
  );
};

export default WineList;
