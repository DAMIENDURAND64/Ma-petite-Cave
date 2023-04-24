import { Button, Grid, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { capitalize, truncateText } from "~/utils/functions";

const WineList = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const wines = api.wines.getAll.useQuery();

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
        {wines.data?.map((wine) => (
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
            <Link
              href={{
                pathname: "/wines/[id]",
                query: { id: wine.id },
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
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default WineList;
