import {
  ActionIcon,
  Badge,
  Button,
  FileButton,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import {
  type Color,
  type TastingNote,
  type Wine,
  type WineBottle,
} from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Upload } from "tabler-icons-react";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { useGetOneWine } from "~/pages/api/APICalls/wines";
import { uploadFileToCloud } from "~/utils/cloudinary";
import { Colors } from "~/utils/colors/Colors";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import ModalQuantity from "~/components/quantity/ModalQuantity";
import { api } from "~/utils/api";
import HeaderPage from "~/components/headerPage/HeaderPage";

type SelectedWineBottle = {
  selectedWineBottle: WineBottle & {
    format: { name: string; capacity: string };
  };
};

function GetOneWine() {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const router = useRouter();
  const { id } = router.query;
  const wineId = parseInt(id as string, 10);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedWineBottle, setSelectedWineBottle] =
    useState<SelectedWineBottle | null>(null);

  const {
    data: wineQuery,
    isLoading,
    refetch: refetchWine,
  } = useGetOneWine(wineId);

  const usePostUpdateImage = api.wines.updateImage.useMutation();
  const usePostUpdateQuantityWine = api.wines.updateQuantity.useMutation();

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    const payload = {
      id: id,
      quantity: quantity,
      wineId: wineId,
    };

    try {
      await usePostUpdateQuantityWine.mutateAsync(payload);
      await refetchWine();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeImage = async () => {
    setLoading(true);
    let imageUrl = "";
    if (file) {
      try {
        imageUrl = await uploadFileToCloud(file);
      } catch (err) {
        console.log(err);
      }
    }

    const payload = {
      id: wineId,
      image: imageUrl,
    };

    try {
      await usePostUpdateImage.mutateAsync(payload);
      await refetchWine();
      setFile(null);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const wine:
    | (Wine & {
        wineColor: Color;
        wineBottles: (WineBottle & {
          format: { name: string; capacity: string };
        })[];
        tastingNotes: TastingNote[];
      })
    | null
    | undefined = wineQuery;

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (isLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  const wineColorId: number | undefined = wine?.wineColorId;
  const coloor: string =
    Colors[wineColorId !== undefined ? wineColorId : 0] ?? "bg-gray-500";

  if (!wine) return <div>loading...</div>;

  return (
    <div className="flexcol gap-3">
      <HeaderPage
        colors={coloor}
        label={wine?.wineColor?.name}
        loading={isLoading}
      />
      <div className="flexcol xy-center">
        <div className="relative">
          {file !== null ? (
            <div>
              <Image
                src={URL.createObjectURL(file)}
                alt="uploaded image"
                width={500}
                height={200}
                className="max-h-[280px] min-h-[280px] min-w-[260px] max-w-[260px] rounded-md"
              />
            </div>
          ) : (
            <Image
              src={wine?.image || "/images/wine.png"}
              alt="wine image"
              width={200}
              height={200}
              className="max-h-[280px] min-h-[280px] min-w-[260px] max-w-[260px] rounded-md"
            />
          )}
          <div className="absolute right-[-8px] top-[-8px] z-10">
            <FileButton onChange={setFile} accept="image/png, image/jpeg">
              {(props) => (
                <ActionIcon
                  variant="outline"
                  size="sm"
                  style={{
                    border:
                      theme.colorScheme === "dark"
                        ? `2px solid ${theme.colors.violet[9]}`
                        : `2px solid ${theme.colors.violet[6]}`,
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.violet[9]
                        : theme.colors.violet[6],
                    color: theme.colorScheme === "dark" ? "white" : "black",
                    width: "30px",
                    height: "25px",
                  }}
                  {...props}
                >
                  <Upload size="1rem" strokeWidth={3} />
                </ActionIcon>
              )}
            </FileButton>
          </div>
        </div>
      </div>
      <div className="flexcol m-3 gap-2">
        <div className="-mt-5 flex w-full justify-center">
          <div className="min-w-[260px] max-w-[260px]">
            {file && (
              <Button
                type="submit"
                size="sm"
                fullWidth
                style={{
                  backgroundImage: theme.fn.gradient({
                    from: "teal",
                    to: "lime",
                    deg: 45,
                  }),
                }}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleChangeImage}
                disabled={!file}
                loading={loading}
              >
                Save Image
              </Button>
            )}
          </div>
        </div>
        <div className="-mt-2 flex w-full flex-col items-center justify-center gap-2">
          <h2 className="text-xl">{wine.name.toUpperCase()}</h2>
          <Badge
            size="xl"
            style={{
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[3],
              color: theme.colorScheme === "dark" ? "white" : "black",
            }}
          >
            {wine.vintage}
          </Badge>
        </div>
        <div className="flex gap-2">
          <h2>Producteur:</h2>
          <p className="font-sans">{wine.producer}</p>
        </div>
        <div className="flex gap-2">
          <h2>Pays:</h2>
          <p className="font-sans">{wine.country}</p>
        </div>
        <div className="flex gap-2">
          <h2>Region:</h2>
          <p className="font-sans">{wine.region}</p>
        </div>
        <div className="flex gap-2">
          <h2>Cépage(s):</h2>
          <p className="font-sans">
            {wine.varietal.length === 0
              ? "aucun cépage(s) selectionné(s)"
              : (wine.varietal as unknown as string)}
          </p>
        </div>
        <div className="flex gap-2">
          <h2>T° idéale:</h2>
          <p className="font-sans">
            {wine.servingTemperature ?? "pas de données"}°
          </p>
        </div>
        <div className="flex gap-2">
          <h2>Date d&apos;achat:</h2>
          <p className="font-sans">
            {wine.purchasedAt
              ? wine.purchasedAt.toLocaleDateString()
              : "pas de date"}
          </p>
        </div>
        <div className="flex flex-col">
          <h2>Description:</h2>
          <p className="w-full font-sans">
            {wine.description ?? "pas de description"}
          </p>
        </div>
        <Badge
          radius="md"
          size="xl"
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[3],
            color: theme.colorScheme === "dark" ? "white" : "black",
            margin: "15px 0",
          }}
        >
          {wine.wineBottles.length > 1 ? "FORMATS" : "FORMAT"}
        </Badge>
        <div className="flex flex-wrap gap-3">
          {wine.wineBottles.map((wineBottle, index) => (
            <>
              <motion.div
                whileHover={{ scale: 1 }}
                className={`w-full cursor-pointer rounded-md ${
                  index % 2 === 0 ? "bg-slate-500" : "bg-slate-600"
                } p-3`}
                key={wineBottle.id}
                onClick={() => {
                  setSelectedWineBottle({ selectedWineBottle: wineBottle });
                  open();
                }}
              >
                <h3 className="mb-2 text-center text-lg font-semibold text-white">{`${wineBottle.format.name} (${wineBottle.format.capacity})`}</h3>
                <div className="flex justify-around">
                  <p className="font-sans text-white">{`${
                    wineBottle.quantity
                  } ${
                    wineBottle.quantity > 1 ? "bouteilles" : "bouteille"
                  }`}</p>
                  <p className="font-sans text-white">{`prix:  ${wineBottle.price}€ /b`}</p>
                </div>
              </motion.div>
              <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                padding="none"
                centered
                overlayProps={{
                  opacity: 0,
                  blur: 1,
                }}
              >
                {selectedWineBottle && (
                  <ModalQuantity
                    wineBottle={selectedWineBottle.selectedWineBottle}
                    handleUpdateQuantity={handleUpdateQuantity}
                  />
                )}
              </Modal>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetOneWine;
