import { Grid, Skeleton, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Colors } from "~/utils/colors/Colors";
import { capitalize, truncateText } from "~/utils/functions";
import { type WineListTemplateProps } from "../type";

function WineListTemplate({ wines }: WineListTemplateProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useMantineTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid justify="space-around" grow gutter="xl" style={{ marginTop: "1px" }}>
      {wines?.map((wine) => {
        const coloor = Colors[wine.wineColor.id] ?? "bg-gray-500";
        return (
          <Grid.Col
            key={wine.id}
            sm={5}
            md={3}
            lg={3}
            style={{
              margin: "9px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[3],
            }}
          >
            <Link
              href={{
                pathname: "/wines/[id]",
                query: { id: wine.id },
              }}
            >
              <div className="flexrow h-fit max-h-[180px] ">
                <div>
                  <Skeleton visible={loading}>
                    <Image
                      src={(wine.image as string) || "/images/black_crows.jpg"}
                      alt={wine.name}
                      width={50}
                      height={50}
                      className="h-[180px] w-[140px]  rounded-md object-cover"
                    />
                  </Skeleton>
                </div>
                <div className="w-full space-y-1 pl-3">
                  <div className="w-fit">
                    <Skeleton visible={loading}>
                      <p>{wine.name.toUpperCase()}</p>
                    </Skeleton>
                  </div>
                  <div className="w-fit">
                    <Skeleton visible={loading}>
                      <p className="font-sans">{capitalize(wine.region)}</p>
                    </Skeleton>
                  </div>
                  <div className="flexrow w-fit items-center gap-1">
                    <Skeleton visible={loading}>
                      <p className="font-sans">{wine.wineColor.name}</p>
                    </Skeleton>
                    <div>
                      <Skeleton visible={loading}>
                        <div className={`${coloor} h-4 w-4 rounded-full`} />
                      </Skeleton>
                    </div>
                  </div>
                  <div className="w-fit">
                    <Skeleton visible={loading}>
                      <p className="font-sans">{wine.vintage}</p>
                    </Skeleton>
                  </div>
                  <div className="w-fit">
                    <Skeleton visible={loading}>
                      <p>Description:</p>
                    </Skeleton>
                  </div>
                  <div className="w-full">
                    <Skeleton visible={loading}>
                      <p className="-mt-1 font-sans text-xs">
                        {truncateText(
                          (wine.description as string) || "non defini",
                          80
                        )}
                      </p>
                    </Skeleton>
                  </div>
                </div>
              </div>
            </Link>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

export default WineListTemplate;
