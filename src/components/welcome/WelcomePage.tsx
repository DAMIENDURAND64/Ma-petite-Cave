import Image from "next/image";
import React from "react";

function WelcomePage() {
  return (
    <div className="xy-center flex-col gap-5 p-3 pt-4">
      <p className="text-center text-4xl font-semibold">
        Welcome to your <br />
        grape-tastic app for wine storage fun. <br />
        <br /> Bottoms up!
      </p>
      <Image
        src="/images/CellarWine.png"
        alt="Bottle of wine"
        width={300}
        height={300}
        className="h-72 w-full rounded-md"
      />
    </div>
  );
}

export default WelcomePage;
