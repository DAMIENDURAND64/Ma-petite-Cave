import { api } from "../api";

export const useGetAllWineColor = () => {
  return api.color.getAll.useQuery();
};
