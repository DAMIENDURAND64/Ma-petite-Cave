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

  const {
    data: wineColorQuery,
    isLoading,
    error,
  } = api.wines.getAllByColor.useQuery(
    { colorId: id as string },
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
      <WineListTemplate wines={wineColorQuery} />
    </div>
  );
};

export default Color;
