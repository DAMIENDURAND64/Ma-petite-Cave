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

const colors: { [key: number]: string } = {
  1: "bg-gradient-to-r from-red-900 to-red-500",
  2: "bg-gradient-to-r from-rose-600 to-rose-300",
  3: "bg-gradient-to-r from-yellow-300 to-yellow-100",
  4: "bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-900",
  5: "bg-gradient-to-r from-amber-900 to-amber-500",
  6: "bg-gradient-to-r from-green-900 to-green-500",
};

function WineListTemplate({ wines }: Props) {
  const theme = useMantineTheme();
  return (
    <Grid justify="space-around" grow gutter="xs">
      {wines?.map((wine) => {
        const coloor = colors[wine.wineColor.id] ?? "bg-gray-500";
        return (
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
              <div className="flexrow h-fit max-h-[185px]">
                <div>
                  <Image
                    src={(wine.image as string) || "/images/black_crows.jpg"}
                    alt={wine.name}
                    width={50}
                    height={50}
                    className="h-[150px] w-[90px]  object-contain"
                  />
                </div>
                <div className="w-full pl-3">
                  <p>{wine.name.toUpperCase()}</p>
                  <p className="font-sans">{capitalize(wine.region)}</p>
                  <div className="flexrow items-center gap-1">
                    <p className="font-sans">{wine.wineColor.name}</p>
                    <div className={`${coloor} h-4 w-4 rounded-full`} />
                  </div>
                  <p className="font-sans">{wine.vintage}</p>
                  <p>
                    Description:
                    <br />
                    <p className="font-sans text-xs">
                      {truncateText(
                        (wine.description as string) || "non defini",
                        80
                      )}
                    </p>
                  </p>
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
