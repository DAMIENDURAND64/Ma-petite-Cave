import { api } from "../api";

export const useGetOneWine = (wineId: number) => {
  return api.wines.getOne.useQuery({ id: wineId });
};

export const UseGetAllWines = () => {
  return api.wines.getAll.useQuery();
};

export const useGetAllWineByColor = (wineColorId: number) => {
  return api.wines.getAllByColor.useQuery({ wineColorId });
};

export const useGetAllWineByFormat = (wineBottleFormatId: number) => {
  return api.wines.getAllByBottleFormat.useQuery({
    formatId: wineBottleFormatId,
  });
};
