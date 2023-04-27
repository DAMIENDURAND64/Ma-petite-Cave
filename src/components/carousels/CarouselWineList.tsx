import { Carousel } from "@mantine/carousel";
import { getStylesRef, useMantineTheme, Button } from "@mantine/core";
import type { Color, Wine } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

function CarouselWineList() {
  const router = useRouter();
  const wines = api.wines.getAll.useQuery();
  console.log(wines.data);
  const theme = useMantineTheme();
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <p>Mes vins:</p>
        <Button
          variant="filled"
          radius="xl"
          compact
          size="xs"
          onClick={() => {
            router.push("/wines").catch((err) => console.log(err));
          }}
          style={{ backgroundColor: theme.colors.violet[9], fontSize: "12px" }}
        >
          voir tout
        </Button>
      </div>
      <Carousel
        withIndicators
        slideSize="30%"
        height={300}
        loop
        align="start"
        dragFree
        slideGap={3}
        speed={5}
        styles={{
          indicator: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? "white !important"
                : "black !important",
            width: "10px",
            height: "5px",
            transition: "width 250ms ease",
            "&[data-active]": {
              width: "40px",
            },
          },
          controls: {
            ref: getStylesRef("controls"),
            transition: "opacity 150ms ease",
            opacity: 0,
          },

          root: {
            "&:hover": {
              [`& .${getStylesRef("controls")}`]: {
                opacity: 1,
              },
            },
          },
        }}
      >
        {wines.data?.map(
          (
            wine: Wine & {
              wineColor: Color;
            }
          ) => (
            <Carousel.Slide
              key={wine.id}
              style={{
                backgroundImage: `url(${wine.wineColor.image as string})`,
                borderRadius: "12px",
                paddingTop: "12px",
                marginRight: "8px",
                maxHeight: "270px",
                minHeight: "270px",
              }}
            >
              <Link
                key={wine.id}
                href={{
                  pathname: "/wines/[id]",
                  query: { id: wine.id },
                }}
              >
                <div className="flexcol relative items-center text-center">
                  <Image
                    src={wine.image || "/images/black_crows.jpg"}
                    alt={wine.name}
                    width={100}
                    height={100}
                    className="ml-1 max-h-[150px] min-h-[150px] object-contain"
                  />
                  <p>{wine.name.toUpperCase()}</p>
                  <p>{wine.vintage}</p>
                </div>
              </Link>
            </Carousel.Slide>
          )
        )}
      </Carousel>
    </div>
  );
}

export default CarouselWineList;
