import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import SignIn from "~/components/sign in/signIn";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  /*  const wines = api.wines.getAll.useQuery();
  const grapes = api.grapes.getAll.useQuery();
  const createGrape = api.grapes.create.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(grapes);
    },
  });

  const deleteGrape = api.grapes.delete.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(grapes);
    },
  });

  const handleDeleteGrape = (id: string) => {
    deleteGrape.mutate({ id });
  };

  const handleClick = () => {
    createGrape.mutate({ name: input });
    setModalOpen(false);
  }; */
  return (
    <>
      {!sessionData && <SignIn />}
      {sessionData && router.push("/homepage")}
    </>
  );
};

export default Home;
