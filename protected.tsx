import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Protected = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      router.replace("/auth/signin").catch((err) => console.error(err));
    } else {
      router.replace("/homepage").catch((err) => console.error(err));
    }
  }, [sessionData, router]);

  return null;
};

export default Protected;
