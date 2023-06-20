import Image from "next/image";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flexcol xy-center mt-10 h-96 gap-4">
      <h1 className="text-center">Please Sign in to get the message</h1>
      <Image
        src="/images/wineBottle.png"
        alt="Bottle of wine"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Unauthorized;
