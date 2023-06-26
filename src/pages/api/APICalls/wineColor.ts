import { api } from "../../../utils/api";

export const useGetAllWineColor = () => {
  return api.color.getAll.useQuery();
};
