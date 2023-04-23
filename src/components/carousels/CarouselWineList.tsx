import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

import { getStylesRef, useMantineTheme } from "@mantine/core";

import React from "react";
import { api } from "~/utils/api";

function CarouselWineList() {
  const wines = api.wines.getAll.useQuery();
  console.log(wines.data);
  const theme = useMantineTheme();
  return (
    <div>
      <p className="mb-3">Mes vins:</p>
      <Carousel
        withIndicators
        height={250}
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
        {wines.data?.map((wine) => (
          <Carousel.Slide key={wine.id}>
            <div className="flex-col items-center text-center">
              <Image
                src={wine.image || "/images/wine.png"}
                alt={wine.name}
                height={150}
                fit="contain"
              />

              <p>{wine.name}</p>
              <p>{wine.year}</p>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselWineList;
