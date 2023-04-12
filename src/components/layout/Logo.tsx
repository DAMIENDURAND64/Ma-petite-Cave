import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex-all-center gap-1">
      <h1 className="text-2xl font-extrabold">
        Ma <br /> petite <br />
        Cave.
      </h1>
      <Image
        src="/images/dropWine.png"
        alt="Drop of wine"
        width={80}
        height={80}
      />
    </div>
  );
};

export default Logo;
