import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";

export const UseGetMe = () => {
  const { data: sessionData } = useSession();

  return api.user.getOne.useQuery(
    { id: sessionData?.user.id as string },
    {
      enabled: !!sessionData?.user.id,
    }
  );
};
