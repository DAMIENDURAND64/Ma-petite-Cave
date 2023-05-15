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
    <div className="px-5">
      <div className="my-2 w-fit">
        <Skeleton visible={isLoading}>
          <NavigationButton
            label="retour"
            onClick={() => {
              router.push("/homepage").catch((err) => console.log(err));
            }}
          />
        </Skeleton>
      </div>
      <WineListTemplate wines={wines} loading={isLoading} />
    </div>
  );
};

export default WineList;
