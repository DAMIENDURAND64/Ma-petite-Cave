import {
  type BottleFormat,
  type Color,
  type TastingNote,
  type Wine,
  type WineBottle,
} from "@prisma/client";

export type NavigationButtonProps = {
  variant?: string;
  radius?: string;
  size?: string;
  color?: string;
  onClick?: () => void;
  label: string;
};

export type CarouselProps = {
  colorData?: Color[];
  wineData?: (Wine & {
    wineBottles: WineBottle[];
    wineColor: Color;
    tastingNotes: TastingNote[];
  })[];
  vintageData?: { vintage: number }[];
  colors?: { [key: number]: string };
  wineBottlesFormat?: BottleFormat[];
  align?: "start" | "center" | "end";
  paddingProps?: string;
};

export type ModalQuantityProps = {
  wineBottle: WineBottle & { format: { name: string; capacity: string } };
  handleUpdateQuantity: (id: number, quantity: number) => Promise<void>;
};

export type WineListTemplateProps = {
  wines?:
    | (Wine & {
        wineColor: Color;
      })[];
  loading?: boolean;
};
