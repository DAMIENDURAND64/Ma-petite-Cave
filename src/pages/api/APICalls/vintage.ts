import { api } from "../../../utils/api";

export const useGetAllVintage = () => {
  return api.vintage.getAllByUser.useQuery();
};
