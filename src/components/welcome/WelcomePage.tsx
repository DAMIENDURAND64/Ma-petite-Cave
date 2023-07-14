import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function WelcomePage() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData) {
      router.push("/homepage").catch((err) => console.log(err));
    }
  }, [sessionData, router]);

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
        className="h-72 w-full rounded-md object-contain"
      />
    </div>
  );
}

export default WelcomePage;
