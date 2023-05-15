import { useSession } from "next-auth/react";
import React from "react";
import WineForm from "~/components/form/WineFormLogic";

function AddWine() {
  const { data: sessionData } = useSession();

  if (sessionData === null) {
    return (
      <div className="flexcol xy-center w-full gap-3">
        <p>Sign in to add a wine</p>
      </div>
    );
  }
  return (
    <div className="flexcol xy-center w-full gap-3 px-3">
      <h1>Add a wine</h1>
      <WineForm />
    </div>
  );
}

export default AddWine;
