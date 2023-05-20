import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavigationButton from "~/components/buttons/NavigationButton";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";
import { Colors } from "~/utils/colors/Colors";

const Color = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const wineColorId = parseInt(id as string, 10);

  const { data: wineColorQuery, error } = api.wines.getAllByColor.useQuery(
    { wineColorId },
    {
      enabled: !!id,
    }
  );

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }

  if (error) {
    return <div>error</div>;
  }

  console.log(id);
  return (
    <div className="flexcol gap-3">
      <div className="m-2 flex gap-2">
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
      <div className="mx-6">
        <WineListTemplate wines={wineColorQuery} />
      </div>
    </div>
  );
};

export default Color;
