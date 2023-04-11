import { useQueryClient } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const session = useSession();
  const loggedIn = !!session.data;
  const wines = api.wines.getAll.useQuery();
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
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Add Grapes
          </h2>
          <button
            className="rounded-md border border-white px-4"
            onClick={() => setModalOpen(true)}
          >
            Add a grape
          </button>
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="rounded-md bg-white p-4">
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="rounded-md bg-blue-500 p-2"
                  onClick={() => handleClick()}
                >
                  Add
                </button>
                <button
                  className="rounded-md bg-red-500 p-2"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            {loggedIn &&
              grapes.data &&
              grapes.data.map((e) => {
                const { id, name } = e;
                return (
                  <div key={id} className="flex gap-8">
                    <p className=" text-left text-2xl">{name}</p>
                    <button onClick={() => handleDeleteGrape(id)}>X</button>
                  </div>
                );
              })}
            <AuthShowcase />
          </div>
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            My Cave
          </h2>
          <div className="flex flex-col items-center gap-2">
            {loggedIn &&
              wines.data &&
              wines.data.map((wine) => {
                return (
                  <div key={wine.name} className="flex gap-8">
                    <p className=" text-left text-2xl">{wine.name}</p>
                    <p className=" text-left text-2xl">{wine.year}</p>
                    <p className=" text-left text-2xl">{wine.region}</p>
                    <p className=" text-left text-2xl">
                      {wine.Grapes.map(
                        (wineGrape) => wineGrape.grape.name
                      ).join(", ")}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
