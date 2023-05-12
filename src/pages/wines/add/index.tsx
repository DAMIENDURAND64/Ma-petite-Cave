import { useSession } from "next-auth/react";
import React from "react";
import WineForm from "~/components/form/WineFormLogic";

function AddWine() {
  const { data: sessionData } = useSession();

  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }
  return (
    <div className="xy-center flexcol w-full gap-5  p-3">
      <h1>Add a wine</h1>
      <WineForm />
    </div>
  );
}

export default AddWine;
