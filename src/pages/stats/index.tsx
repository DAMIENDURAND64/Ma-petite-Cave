import { Accordion } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { DoughnutForFormatOfBottles } from "~/components/charts/DoughnutForFormatBottle";
import { DoughnutForNumOfBottles } from "~/components/charts/DoughnutForNumOfBottles";
import { DoughnutForValOfBottles } from "~/components/charts/DoughnutForValOfBottles";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { api } from "~/utils/api";
import { IconPlus } from "@tabler/icons-react";
import useStyles from "~/utils/mantineStyle/AccordionStyle";
import { LoaderRing } from "~/components/loader/loaderRing";

const IndexStats = () => {
  const { data: sessionData } = useSession();
  const [accordion, setAccordion] = useState<string[] | undefined>([
    "Bouteilles",
  ]);
  const { classes } = useStyles();
  const { data: allWinesData, isLoading: allWinesDataLoading } =
    api.wines.getAll.useQuery();
  const { data: allFormatsData, isLoading: allFormatsDataLoading } =
    api.bottleFormat.getAll.useQuery();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (allWinesDataLoading || allFormatsDataLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  const controlStyle = accordion?.includes(
    "Bouteilles" || "Valeur totale" || "formats"
  )
    ? { borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }
    : { borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" };

  const wineBottlesByColor = [1, 2, 3, 4, 5, 6].reduce(
    // 1:red, 2:white, 3:rose, 4:sparkling, 5:liquors, 6:spirits
    (acc: Record<number, number>, colorId) => {
      const wineData = allWinesData?.filter(
        (wine) => wine.wineColorId === colorId
      );
      acc[colorId] =
        wineData?.reduce(
          (total, wine) =>
            total +
            wine.wineBottles.reduce((sum, bottle) => sum + bottle.quantity, 0),
          0
        ) || 0;
      return acc;
    },
    {} as Record<number, number>
  );

  const totalWineBottles = Object.values(wineBottlesByColor).reduce(
    (sum, value) => sum + value,
    0
  );

  const wineBottlesValues = [1, 2, 3, 4, 5, 6].reduce(
    // 1:red, 2:white, 3:rose, 4:sparkling, 5:liquors, 6:spirits
    (acc: Record<number, number>, colorId) => {
      const wineData = allWinesData?.filter(
        (wine) => wine.wineColorId === colorId
      );
      acc[colorId] =
        wineData?.reduce(
          (total, wine) =>
            total +
            wine.wineBottles.reduce(
              (sum, bottle) => sum + bottle.price * bottle.quantity,
              0
            ),
          0
        ) || 0;
      return acc;
    },
    {} as Record<number, number>
  );

  const totalWineBottlesValue = Object.values(wineBottlesValues).reduce(
    (sum, value) => sum + value,
    0
  );

  const formatNames: Map<number, string> = new Map(
    allFormatsData?.map((format) => [format.id, format.name])
  );
  const formatCounts = {} as Record<string, number>;

  allWinesData?.forEach((wine) => {
    wine.wineBottles.forEach((bottle) => {
      const formatName: string = formatNames.get(bottle.formatId) || "Unknown";
      const quantity = bottle.quantity;

      if (formatCounts[formatName]) {
        formatCounts[formatName] += quantity;
      } else {
        formatCounts[formatName] = quantity;
      }
    });
  });

  return (
    <div className="pb-3">
      <h1 className="pb-5 text-center">Mes Stats</h1>
      <Accordion
        multiple
        variant="separated"
        radius="md"
        defaultValue={["Bouteilles"]}
        value={accordion}
        onChange={setAccordion}
        chevron={<IconPlus size="1rem" />}
        styles={{
          chevron: {
            "&[data-rotate]": {
              transform: "rotate(135deg)",
            },
          },
        }}
      >
        <Accordion.Item value="Bouteilles" className={classes.item}>
          <Accordion.Control className={classes.control} style={controlStyle}>
            {accordion?.includes("Bouteilles")
              ? `${totalWineBottles} bouteilles`
              : "Bouteilles"}
          </Accordion.Control>
          <Accordion.Panel className={classes.panel}>
            <DoughnutForNumOfBottles wineBottlesByColor={wineBottlesByColor} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Valeur totale" className={classes.item}>
          <Accordion.Control className={classes.control} style={controlStyle}>
            {accordion?.includes("Valeur totale")
              ? `Valeur totale: ${totalWineBottlesValue}€`
              : "Valeur totale"}
          </Accordion.Control>
          <Accordion.Panel className={classes.panel}>
            <DoughnutForValOfBottles wineBottlesValues={wineBottlesValues} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="formats" className={classes.item}>
          <Accordion.Control className={classes.control} style={controlStyle}>
            {accordion?.includes("formats")
              ? `Formats: ${Object.keys(formatCounts).length}`
              : "Formats"}{" "}
          </Accordion.Control>
          <Accordion.Panel className={classes.panel}>
            <div className="w-full">
              <DoughnutForFormatOfBottles formatCounts={formatCounts} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default IndexStats;
