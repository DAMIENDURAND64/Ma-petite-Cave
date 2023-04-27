import { Grid, useMantineTheme } from "@mantine/core";
import type { Color, Wine } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { capitalize, truncateText } from "~/utils/functions";

interface Props {
  wines:
    | (Wine & {
        wineColor: Color;
      })[];
}

function WineListTemplate({ wines }: Props) {
  const theme = useMantineTheme();
  return (
    <Grid justify="space-around" grow gutter="xs">
      {wines?.map((wine) => (
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
                <div className="flexrow items-center gap-1">
                  <p>{wine.wineColor.name}</p>
                  <p
                    style={{
                      backgroundImage: `url(${wine.wineColor.image as string})`,
                    }}
                    className="h-3 w-3 rounded-full"
                  />
                </div>
                <p>{wine.vintage}</p>
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
  );
}

export default WineListTemplate;
