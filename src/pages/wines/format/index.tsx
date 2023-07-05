import { Grid, Skeleton, useMantineTheme } from "@mantine/core";
import { type BottleFormat } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { useGetAllBottlesFormat } from "~/pages/api/APICalls/bottleFormat";

const FormatHomepage = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      <HeaderPage
        colors=""
        label="Formats"
        loading={wineBottlesFormatLoading}
        sortFilter={false}
      />
      <Grid grow gutter="lg" style={{ marginRight: "6px", marginLeft: "6px" }}>
        {wineBottlesFormat?.map((format: BottleFormat) => {
          return (
            <Grid.Col
              key={format.id}
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
                      pathname: "/wines/format/[id]",
                      query: { id: format.id },
                    }}
                  >
                    <div className="flexcol xy-center h-full truncate">
                      <p className="font-sans text-lg font-bold">
                        {format.name}
                      </p>
                      <p className="text-md font-sans">{`(${format.capacity})`}</p>
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

export default FormatHomepage;
