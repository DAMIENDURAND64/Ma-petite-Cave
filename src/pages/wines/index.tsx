import { Skeleton } from "@mantine/core";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";

const WineList = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { data: wines, isLoading } = api.wines.getAll.useQuery();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  return (
    <div className="flexcol gap-3">
      <div className="ml-1 mt-1">
        <Skeleton visible={isLoading}>
          <NavigationButton
            size="sm"
            label="retour"
            onClick={() => {
              router.push("/homepage").catch((err) => console.log(err));
            }}
          />
        </Skeleton>
      </div>
      <div className="mx-6">
        <WineListTemplate wines={wines} loading={isLoading} />
      </div>
    </div>
  );
};

export default WineList;
