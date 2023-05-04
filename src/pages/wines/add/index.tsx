import React from "react";
import WineForm from "~/components/form/CreateWineForm";

function addWine() {
  return (
    <div className="xy-center flexcol gap-5 p-3">
      <h1>Add a wine</h1>
      <WineForm />
    </div>
  );
}

export default addWine;
