import { Autocomplete } from "@mantine/core";
import { type Wine } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { ColorFromId } from "~/utils/colors/Colors";

type SearchBarProps = {
  wineData: Wine[];
};

const SearchBar = ({ wineData }: SearchBarProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const data = value
    ? wineData.map((wine) => {
        return {
          value: wine.name,
          label: wine.name,
          id: wine.id,
          wineColor: wine.wineColorId,
        };
      })
    : [];

  const handleClickWine = ({ id }: { id: number }) => {
    router.push(`/wines/${id}`).catch((err) => console.log(err));
  };

  console.log(data);

  const autoCompleteItem = ({
    value,
    wineColor,
    id,
  }: {
    value: string;
    id: number;
    wineColor: number;
  }) => (
    <div
      className="y-center flex w-full gap-3 px-3"
      key={id}
      onClick={() => handleClickWine({ id })}
    >
      <ColorFromId id={wineColor} />
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
          data={data}
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
