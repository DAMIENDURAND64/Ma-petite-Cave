import { api } from "../api";

export const useGetAllVintage = () => {
  return api.vintage.getAllByUser.useQuery();
};
