import React from "react";
import { api } from "~/utils/api";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

function Homepage() {
  const wineColor = api.color.getAll.useQuery();

  return (
    <div>
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        {wineColor.data?.map((color) => (
          <Carousel.Slide key={color.id}>
            <Image
              src={color.backgroundColor as string}
              alt={color.name}
              width={320}
              height={200}
            />
            <p className="xy-center relative">{color.name}</p>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default Homepage;
