import { api } from "../../../utils/api";

export const useGetOneBottleFormat = (wineBottleFormatId: number) => {
  return api.bottleFormat.getOne.useQuery({ id: wineBottleFormatId });
};

export const useGetAllBottlesFormat = () => {
  return api.bottleFormat.getAll.useQuery();
};
