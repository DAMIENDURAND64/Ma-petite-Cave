import { Grid, useMantineTheme } from "@mantine/core";
import { type BottleFormat } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { useGetAllBottlesFormat } from "~/utils/APICalls/bottleFormat";

const FormatHomepage = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const router = useRouter();

  const {
    data: wineBottlesFormat = [],
    isLoading: wineBottlesFormatLoading,
    error: wineBottlesFormatError,
  } = useGetAllBottlesFormat();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (wineBottlesFormatLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  if (wineBottlesFormatError) {
    return <div>No Data available</div>;
  }

  return (
    <div className="flexcol gap-6">
      <div className="flex gap-2">
        <NavigationButton
          size="sm"
          label="retour"
          radius="md"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
        />
        <div className="xy-center flex h-[26px] w-full rounded-md bg-slate-500">
          <h1 className="text-lg">Formats</h1>
        </div>
      </div>
      <Grid grow gutter="lg">
        {wineBottlesFormat?.map((format: BottleFormat) => {
          return (
            <Grid.Col
              span={4}
              key={format.id}
              style={{
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[3],
                color: theme.colorScheme === "dark" ? "white" : "black",
                margin: "6px",
                borderRadius: "10px",
                height: "100px",
              }}
            >
              <Link
                href={{
                  pathname: "/wines/format/[id]",
                  query: { id: format.id },
                }}
              >
                <div className="flexcol xy-center h-full truncate">
                  <p className="font-sans text-lg font-bold">{format.name}</p>
                  <p className="text-md font-sans">{`(${format.capacity})`}</p>
                </div>
              </Link>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default FormatHomepage;
