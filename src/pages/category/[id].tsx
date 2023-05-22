import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";
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
  } = api.wines.getAllByColor.useQuery(
    { wineColorId },
    {
      enabled: !!id,
    }
  );

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
      <div className="flex gap-2">
        <NavigationButton
          size="sm"
          label="retour"
          radius="md"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
        />
        <div
          className={`${
            Colors[wineColorId] as string
          } xy-center flex h-[26px] w-full rounded-md`}
        >
          <h1 className="text-lg">{wineColorQuery?.[0]?.wineColor?.name}</h1>
        </div>
      </div>
      <div className="mx-5">
        <WineListTemplate wines={wineColorQuery} />
      </div>
    </div>
  );
};

export default Color;
