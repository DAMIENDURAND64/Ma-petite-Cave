import { Button, Skeleton, useMantineTheme } from "@mantine/core";

import { useRouter } from "next/router";
import React from "react";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";

const WineList = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { data: wines, isLoading } = api.wines.getAll.useQuery();

  if (!wines) {
    return <div>No wines found...</div>;
  }

  return (
    <div className="px-5">
      <div className="my-2 w-fit">
        <Skeleton visible={isLoading}>
          <Button
            variant="filled"
            radius="xl"
            compact
            size="xs"
            onClick={() => {
              router.push("/homepage").catch((err) => console.log(err));
            }}
            style={{
              backgroundColor: theme.colors.violet[9],
              fontSize: "12px",
            }}
          >
            retour
          </Button>
        </Skeleton>
      </div>
      <WineListTemplate wines={wines} loading={isLoading} />
    </div>
  );
};

export default WineList;
