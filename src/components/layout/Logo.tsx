import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/homepage">
      <div className="flexrow items-end">
        <h1 className="text-2xl font-extrabold">
          Ma <br /> petite <br />
          Cave.
        </h1>
        <Image
          src="/images/dropWine.png"
          alt="Drop of wine"
          width={90}
          height={80}
        />
      </div>
    </Link>
  );
};

export default Logo;
