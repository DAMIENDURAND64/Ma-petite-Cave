import { Carousel } from "@mantine/carousel";

import { getStylesRef, useMantineTheme, Image, Button } from "@mantine/core";
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
      <div className="flex justify-between">
        <p className="mb-6">Mes vins:</p>
        <Button
          variant="filled"
          radius={"xl"}
          compact
          onClick={() => {
            router.push("/wines").catch((err) => console.log(err));
          }}
          style={{ backgroundColor: theme.colors.violet[9] }}
        >
          voir tout
        </Button>
      </div>
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
          <Carousel.Slide
            key={wine.id}
            style={{
              backgroundImage: `url(${wine.color.backgroundColor as string})`,
              borderRadius: "12px",
              paddingTop: "12px",
              marginRight: "8px",
            }}
          >
            <div className="flex-col items-center text-center">
              <Image
                src={wine.image || "/images/wine.png"}
                alt={wine.name}
                height={150}
                width={130}
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
