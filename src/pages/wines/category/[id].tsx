import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderPage from "~/components/headerPage/HeaderPage";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { useGetAllWineByColor } from "~/pages/api/APICalls/wines";
import { Colors } from "~/utils/colors/Colors";

const Color = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const wineColorId = parseInt(id as string, 10);

  const {
    data: wineColorQuery,
    error,
    isLoading,
  } = useGetAllWineByColor(wineColorId);

  if (sessionData === null) {
    return <Unauthorized />;
  }

  if (error) {
    return <div>error</div>;
  }
  if (isLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  return (
    <div className="flexcol gap-3">
      <HeaderPage
        colors={Colors[wineColorId] as string}
        loading={isLoading}
        label={wineColorQuery?.[0]?.wineColor?.name}
      />
      <div className="mx-5">
        <WineListTemplate wines={wineColorQuery} />
      </div>
    </div>
  );
};

export default Color;
