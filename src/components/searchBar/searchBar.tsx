import { Autocomplete, useMantineTheme } from "@mantine/core";
import { type Wine } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";

import React, { useState } from "react";

type Props = {
  wineData: Wine[];
};

const SearchBar = ({ wineData }: Props) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [value, setValue] = useState("");

  const data = wineData.map((wine) => {
    return {
      value: wine.name,
      label: wine.name,
      id: wine.id,
    };
  });

  const handleClickWine = (id: number) => {
    router.push(`/wines/${id}`).catch((err) => console.log(err));
  };

  return (
    <div className="x-center mb-2 flex">
      <div className="w-3/4">
        <Autocomplete
          icon={
            <IconSearch
              style={{
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.violet[9]
                    : theme.colors.dark[9],
              }}
            />
          }
          value={value}
          onChange={setValue}
          data={data}
          placeholder="Chercher un vin"
          radius="md"
          onItemSubmit={(value) => handleClickWine(value.id as number)}
          styles={(theme) => ({
            input: {
              borderColor:
                theme.colorScheme === "dark"
                  ? theme.colors.violet[9]
                  : theme.colors.dark[9],
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.violet[9]
                  : theme.colors.dark[9],
              "::placeholder": {
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.violet[9]
                    : theme.colors.dark[9],
              },
            },
          })}
        />
      </div>
    </div>
  );
};

export default SearchBar;
