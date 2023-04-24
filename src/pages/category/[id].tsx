import { Button, Grid, useMantineTheme } from "@mantine/core";
import type { Wine } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { capitalize, truncateText } from "~/utils/functions";

type WineWithColor = Wine & {
  color: {
    name: string;
  };
};

const Color = () => {
  const theme = useMantineTheme();

  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const wineColorQuery = api.wines.getAllByColor.useQuery(
    { colorId: id as string },
    {
      enabled: !!id,
    }
  );

  if (wineColorQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (wineColorQuery.error) {
    return <div>Error: {wineColorQuery.error.message}</div>;
  }

  const wineColor: WineWithColor[] = wineColorQuery.data;

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

      <Grid justify="space-around" grow gutter="xs">
        {wineColor.map((wine) => (
          <Grid.Col
            key={wine.id}
            sm={5}
            md={3}
            lg={3}
            style={{
              border: `2px solid ${theme.colors.violet[9]}`,
              margin: "3px",
              borderRadius: "10px",
            }}
          >
            <div className="flexrow h-[170px]">
              <div>
                <Image
                  src={(wine.image as string) || "/images/black_crows.jpg"}
                  alt={wine.name}
                  width={50}
                  height={50}
                  className="h-full w-[100px] object-contain"
                />
              </div>
              <div className="w-full pl-4">
                <p>{wine.name.toUpperCase()}</p>
                <p>{capitalize(wine.region)}</p>
                <p>{wine.color.name}</p>
                <p>{wine.year}</p>
                <p>
                  Description:
                  <br />
                  <span className="text-xs">
                    {truncateText(
                      (wine.description as string) || "non defini",
                      70
                    )}
                  </span>
                </p>
              </div>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Color;
