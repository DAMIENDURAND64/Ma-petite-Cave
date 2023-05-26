import { Autocomplete } from "@mantine/core";
import { type BottleFormat, type Color, type Wine } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { ColorFromId } from "~/utils/colors/Colors";

type SearchBarProps = {
  wineData: Wine[];
  winesBottleData: BottleFormat[];
  winesColorData: Color[];
};

const SearchBar = ({
  wineData,
  winesBottleData,
  winesColorData,
}: SearchBarProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const data = value
    ? wineData.map((wine) => {
        return {
          value: wine.name,
          label: wine.name,
          id: wine.id,
          wineColor: wine.wineColorId,
          group: "Wines",
        };
      })
    : [];

  const dataBottle = value
    ? winesBottleData.map((wine) => {
        return {
          value: wine.name,
          label: wine.name,
          id: wine.id,
          group: "Bottles",
        };
      })
    : [];

  const dataColor = value
    ? winesColorData.map((color) => {
        return {
          value: color.name,
          label: color.name,
          id: color.id,
          colorId: color.id,
          group: "Colors",
        };
      })
    : [];

  const handleClickWine = ({ id, group }: { id: number; group: string }) => {
    if (group === "Bottles")
      router.push(`wines/format/${id}`).catch((err) => console.log(err));
    if (group === "Colors")
      router.push(`/category/${id}`).catch((err) => console.log(err));
    if (group === "Wines")
      router.push(`/wines/${id}`).catch((err) => console.log(err));
  };

  const autoCompleteItem = ({
    value,
    wineColor,
    id,
    colorId,
    group,
  }: {
    value: string;
    id: number;
    wineColor: number;
    colorId: number;
    group: string;
  }) => (
    <div
      className="y-center flex w-full gap-2 px-3"
      key={id}
      onClick={() => handleClickWine({ id, group })}
    >
      <ColorFromId id={wineColor ?? colorId} />
      {value}
    </div>
  );

  return (
    <div className="x-center mb-2 flex">
      <div className="w-5/6">
        <Autocomplete
          icon={<IconSearch />}
          value={value}
          maxDropdownHeight={150}
          onChange={setValue}
          data={[...data, ...dataBottle, ...dataColor]}
          minLength={1}
          itemComponent={autoCompleteItem}
          placeholder="Chercher un vin"
          radius="md"
          shadow="xl"
          transitionProps={{ duration: 300 }}
          styles={(theme) => ({
            input: {
              fontFamily: "Helvetica",
              fontSize: "1.1rem",
              border: `3px solid ${
                theme.colorScheme === "dark"
                  ? `${theme.colors.violet[9]} !important`
                  : `${theme.colors.violet[6]} !important`
              }}`,
            },
          })}
          style={{
            fontFamily: "Helvetica",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
