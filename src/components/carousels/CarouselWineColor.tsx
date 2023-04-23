import React from "react";
import { api } from "~/utils/api";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { getStylesRef, useMantineTheme } from "@mantine/core";
import Link from "next/link";

function CarouselWineColor() {
  const wineColor = api.color.getAll.useQuery();
  const theme = useMantineTheme();

  return (
    <div>
      <p className="-mb-3">Categories:</p>
      <Carousel
        withIndicators
        height={90}
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
        {wineColor.data?.map((color) => (
          <Carousel.Slide key={color.id}>
            <Link
              href={{
                pathname: "/color/[id]",
                query: { id: color.id },
              }}
            >
              <div className="relative mt-6">
                <Image
                  src={color.backgroundColor as string}
                  alt={color.name}
                  width={300}
                  height={300}
                  className="min-h-10 max-h-10 rounded-xl object-cover"
                />
                <p className="absolute-center">{color.name}</p>
              </div>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselWineColor;
