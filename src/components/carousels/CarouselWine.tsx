import React from "react";
import { Carousel } from "@mantine/carousel";
import { Button, getStylesRef, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import type { Color, TastingNote, Wine, WineFormat } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";

type CarouselProps = {
  colorData?: Color[];
  wineData?: (Wine & {
    formats: WineFormat[];
    wineColor: Color;
    tastingNotes: TastingNote[];
  })[];
  height?: string;
  colors: { [key: number]: string };
};

function CarouselWine({ colorData, wineData, height, colors }: CarouselProps) {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <div>
      {colorData && <p className="mb-3">Categories:</p>}
      {wineData && (
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
            style={{
              backgroundColor: theme.colors.violet[9],
              fontSize: "12px",
            }}
          >
            voir tout
          </Button>
        </div>
      )}
      <Carousel
        withIndicators
        slideSize="30%"
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
            transition: "width 650ms ease",
            "&[data-active]": {
              width: "40px",
            },
          },
          controls: {
            ref: getStylesRef("controls"),
            transition: "opacity 150ms ease",
            opacity: 0,
            top: "12px",
          },

          root: {
            "&:hover": {
              [`& .${getStylesRef("controls")}`]: {
                opacity: 1,
              },
            },
            height: height ?? "300px",
          },
        }}
      >
        {colorData?.map((color: Color) => {
          const coloor = colors[color.id] ?? "bg-gray-500";
          return (
            <Carousel.Slide key={color.id}>
              <Link
                href={{
                  pathname: "/category/[id]",
                  query: { id: color.id },
                }}
              >
                <div className={`${coloor} relative h-12 rounded-lg`}>
                  <p className="absolute-center">{color.name}</p>
                </div>
              </Link>
            </Carousel.Slide>
          );
        })}
        {wineData?.map((wine) => {
          const coloor = colors[wine.wineColorId] ?? "bg-gray-500";
          return (
            <Carousel.Slide key={wine.id}>
              <Link
                key={wine.id}
                href={{
                  pathname: "/wines/[id]",
                  query: { id: wine.id },
                }}
              >
                <div className="h-48 rounded-md border border-slate-500">
                  <div className={`${coloor}  h-3 rounded-t-md`} />
                  <Image
                    src={wine.image || "/images/black_crows.jpg"}
                    alt={wine.name}
                    width={100}
                    height={100}
                    className="absolute top-0 ml-1 max-h-[150px] min-h-[150px] object-contain"
                  />
                  <p>{wine.name.toUpperCase()}</p>
                  <p>{wine.vintage}</p>
                </div>
              </Link>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselWine;
