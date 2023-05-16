import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavigationButton from "~/components/buttons/NavigationButton";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";

const Color = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const wineColorId = parseInt(id as string, 10);

  const {
    data: wineColorQuery,
    isLoading,
    error,
  } = api.wines.getAllByColor.useQuery(
    { wineColorId },
    {
      enabled: !!id,
    }
  );

  if (error) {
    return <div>error</div>;
  }

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }
  return (
    <div className="flexcol gap-3">
      <div className="ml-1 mt-1">
        <NavigationButton
          size="md"
          label="retour"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
        />
      </div>
      <div className="mx-6">
        <WineListTemplate wines={wineColorQuery} loading={isLoading} />
      </div>
    </div>
  );
};

export default Color;
