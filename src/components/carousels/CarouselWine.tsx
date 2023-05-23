import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Skeleton, getStylesRef, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import type {
  BottleFormat,
  Color,
  TastingNote,
  Wine,
  WineBottle,
} from "@prisma/client";
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
  colors?: { [key: number]: string };
  wineBottlesFormat?: BottleFormat[];
};

function CarouselWine({
  colorData,
  wineData,
  wineBottlesFormat,
  colors,
  controlsProps,
}: CarouselProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useMantineTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {colorData && (
        <div className="w-fit">
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
                size="sm"
                onClick={() => {
                  router.push("/wines").catch((err) => console.log(err));
                }}
                label="Voir tous"
                radius="md"
              />
            </Skeleton>
          </div>
        </div>
      )}
      {wineBottlesFormat && (
        <div className="flex justify-between ">
          <Skeleton visible={loading}>Formats:</Skeleton>
        </div>
      )}
      <Carousel
        withIndicators={false}
        slideSize="30%"
        loop
        align="start"
        dragFree
        slideGap={3}
        speed={5}
        styles={{
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
            ".mantine-1my8u2w": {
              paddingLeft: "6px !important",
            },
          },
        }}
      >
        {colorData?.map((color: Color) => {
          const coloor = (colors && colors[color.id]) ?? "bg-gray-500";
          return (
            <Carousel.Slide
              key={color.id}
              style={{
                margin: "8px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                borderRadius: "10px",
                width: "128px",
              }}
            >
              <Skeleton visible={loading}>
                <Link
                  href={{
                    pathname: "/category/[id]",
                    query: { id: color.id },
                  }}
                >
                  <div className={`${coloor} relative h-10 w-32 rounded-md `}>
                    <p className="absolute-center font-sans text-sm font-bold">
                      {color.name}
                    </p>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}
        {wineData?.map((wine) => {
          const coloor = (colors && colors[wine.wineColorId]) ?? "bg-gray-500";
          return (
            <Carousel.Slide
              key={wine.id}
              style={{
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1],
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                borderRadius: "10px",
                margin: "8px ",
                padding: "10px",
              }}
            >
              <Skeleton visible={loading}>
                <Link
                  key={wine.id}
                  href={{
                    pathname: "/wines/[id]",
                    query: { id: wine.id },
                  }}
                >
                  <div className="w-36">
                    <div className={`${coloor} h-3 w-full rounded-t-md`} />
                    <div
                      className={`flexcol y-center h-[255px]  rounded-md  text-center text-xs`}
                    >
                      <div className="relative mx-1 mb-2  h-[190px] w-full">
                        <Image
                          src={wine.image || "/images/black_crows.jpg"}
                          alt={wine.name}
                          fill
                          className="rounded-b-md object-cover"
                        />
                      </div>
                      <p className="font-sans font-semibold">
                        {wine.name.toUpperCase()}
                      </p>
                      <p className="font-sans font-semibold">{wine.vintage}</p>
                    </div>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}
        {wineBottlesFormat?.map((format: BottleFormat) => {
          return (
            <Carousel.Slide
              key={format.id}
              style={{
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1],
                borderRadius: "10px",
                margin: "8px",
                padding: "5px",
              }}
            >
              <Skeleton visible={loading}>
                <Link
                  href={{
                    pathname: "/wines/format/[id]",
                    query: { id: format.id },
                  }}
                >
                  <div className="truncate text-center">
                    <p className="font-sans text-sm font-bold">{format.name}</p>
                    <p className="font-sans text-sm font-bold">{`(${format.capacity})`}</p>
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
