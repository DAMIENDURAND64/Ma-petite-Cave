import { Grid, Skeleton, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { useGetAllVintage } from "~/utils/APICalls/vintage";
import { uniqueVintage } from "~/utils/functions";

const VintageHomepage = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const {
    data: wineVintage = [],
    isLoading: wineVintageLoading,
    error: wineVintageError,
  } = useGetAllVintage();

  const vintageToMap = uniqueVintage(wineVintage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (wineVintageLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  if (wineVintageError) {
    return <div>No Data available</div>;
  }

  return (
    <div className="flexcol gap-6">
      <div className="flex  gap-2">
        <div className="w-fit">
          <Skeleton visible={loading}>
            <NavigationButton
              size="sm"
              label="retour"
              radius="md"
              onClick={() => {
                router.push("/homepage").catch((err) => console.log(err));
              }}
            />
          </Skeleton>
        </div>
        <Skeleton visible={loading}>
          <div className="xy-center flex h-[26px] w-full rounded-md bg-slate-500">
            <h1 className="text-lg">Vintage</h1>
          </div>
        </Skeleton>
      </div>
      <Grid grow gutter="lg">
        {vintageToMap
          ?.sort((a, b) => a.vintage - b.vintage)
          .map((item) => {
            const { vintage } = item;

            return (
              <Grid.Col
                key={vintage}
                span={4}
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
                <div className="xy-center flex h-full w-full">
                  <Skeleton visible={loading}>
                    <Link
                      href={{
                        pathname: "/wines/vintage/[id]",
                        query: { id: vintage },
                      }}
                    >
                      <div className="flexcol xy-center h-full truncate">
                        <p className="text-3xl font-bold">{vintage}</p>
                      </div>
                    </Link>
                  </Skeleton>
                </div>
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default VintageHomepage;
