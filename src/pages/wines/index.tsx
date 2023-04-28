import { Button, useMantineTheme } from "@mantine/core";

import { useRouter } from "next/router";
import React from "react";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";

const WineList = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { data: wines, isLoading, error } = api.wines.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-5">
      <div className="my-2">
        <Button
          variant="filled"
          radius="xl"
          compact
          size="xs"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
          style={{ backgroundColor: theme.colors.violet[9], fontSize: "12px" }}
        >
          retour
        </Button>
      </div>
      <WineListTemplate wines={wines} />
    </div>
  );
};

export default WineList;
