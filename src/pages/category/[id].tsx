import { Button, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import WineListTemplate from "~/components/wineList/wineList";
import { api } from "~/utils/api";

const Color = () => {
  const theme = useMantineTheme();

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
    <div className="px-5">
      <div className="my-2">
        <Button
          variant="filled"
          radius="xl"
          compact
          size="xs"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
          style={{ backgroundColor: theme.colors.violet[9], fontSize: "12px" }}
        >
          retour
        </Button>
      </div>
      <WineListTemplate wines={wineColorQuery} loading={isLoading} />
    </div>
  );
};

export default Color;
