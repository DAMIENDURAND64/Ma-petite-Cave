import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { ColorFromId } from "~/utils/colors/Colors";
import { LoaderRing } from "../loader/loaderRing";
import { useGetAllWineColor } from "~/utils/APICalls/wineColor";
import { useGetAllBottlesFormat } from "~/utils/APICalls/bottleFormat";
import { UseGetAllWines } from "~/utils/APICalls/wines";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const {
    data: wineColor = [],
    isLoading: wineColorLoading,
    error: wineColorError,
  } = useGetAllWineColor();

  const {
    data: wineBottlesFormat = [],
    isLoading: wineBottlesFormatLoading,
    error: wineBottlesFormatError,
  } = useGetAllBottlesFormat();

  const {
    data: wines = [],
    isLoading: winesLoading,
    error: wineError,
  } = UseGetAllWines();

  if (wineColorLoading || winesLoading || wineBottlesFormatLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  if (wineColorError || wineError || wineBottlesFormatError) {
    return <div>No Data available</div>;
  }

  const data = value
    ? wines.map((wine) => {
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
    ? wineBottlesFormat.map((wine) => {
        return {
          value: wine.name,
          label: wine.name,
          id: wine.id,
          group: "Bottles",
        };
      })
    : [];

  const dataColor = value
    ? wineColor.map((color) => {
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
      className="y-center flex w-full gap-2"
      key={id}
      onClick={() => handleClickWine({ id, group })}
    >
      <ColorFromId id={wineColor ?? colorId} />
      {value}
    </div>
  );

  return (
    <div className="flex justify-end">
      <div className="w-full">
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
              border: `1px solid ${
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
