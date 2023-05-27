import { api } from "../api";

export const getWines = () => {
  return api.wines.getAll.useQuery();
};
