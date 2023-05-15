import React from "react";
import { Carousel } from "@mantine/carousel";
import { Skeleton, getStylesRef, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import type { Color, TastingNote, Wine, WineBottle } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import NavigationButton from "../buttons/NavigationButton";

type CarouselProps = {
  controlsProps?: string;
  colorData?: Color[];
  wineData?: (Wine & {
    wineBottles: WineBottle[];
    wineColor: Color;
    tastingNotes: TastingNote[];
  })[];
  height?: string;
  colors: { [key: number]: string };
  loading?: boolean;
};

function CarouselWine({
  colorData,
  wineData,
  height,
  colors,
  controlsProps,
  loading,
}: CarouselProps) {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <div>
      {colorData && (
        <div className="mb-2 w-fit">
          <Skeleton visible={loading}>Categories: </Skeleton>
        </div>
      )}
      {wineData && (
        <div className="mb-2 flex justify-between ">
          <div>
            <Skeleton visible={loading}>Mes vins:</Skeleton>
          </div>
          <div>
            <Skeleton visible={loading}>
              <NavigationButton
                onClick={() => {
                  router.push("/wines").catch((err) => console.log(err));
                }}
                label="Voir tous"
              />
            </Skeleton>
          </div>
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
            top: controlsProps,
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
              <Skeleton visible={loading}>
                <Link
                  href={{
                    pathname: "/category/[id]",
                    query: { id: color.id },
                  }}
                >
                  <div className={`${coloor} relative h-10 rounded-lg`}>
                    <p className="absolute-center font-sans text-sm  font-bold">
                      {color.name}
                    </p>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}
        {wineData?.map((wine) => {
          const coloor = colors[wine.wineColorId] ?? "bg-gray-500";
          return (
            <Carousel.Slide key={wine.id}>
              <Skeleton visible={loading}>
                <Link
                  key={wine.id}
                  href={{
                    pathname: "/wines/[id]",
                    query: { id: wine.id },
                  }}
                >
                  <div className={`${coloor} h-2 w-full rounded-full`} />
                  <div
                    className={`flexcol y-center h-[270px]  rounded-md  text-center text-xs`}
                  >
                    <div className="relative mx-1 my-1 h-[180px] w-[110px]">
                      <Image
                        src={wine.image || "/images/black_crows.jpg"}
                        alt={wine.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <p className="font-sans font-semibold">
                      {wine.name.toUpperCase()}
                    </p>
                    <p className="font-sans font-semibold">{wine.vintage}</p>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselWine;
