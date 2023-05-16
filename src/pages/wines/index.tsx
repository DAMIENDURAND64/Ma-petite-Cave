import { Skeleton } from "@mantine/core";

import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";

const WineList = () => {
  const router = useRouter();
  const { data: wines, isLoading } = api.wines.getAll.useQuery();

  return (
    <div className="flexcol gap-3">
      <div className="ml-1 mt-1">
        <Skeleton visible={isLoading}>
          <NavigationButton
            size="md"
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
