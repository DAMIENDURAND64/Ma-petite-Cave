import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../buttons/button";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex justify-end">
      <Button
        /*         className="h-12 rounded-md border  border-white  px-4  font-semibold transition hover:bg-white/20"
         */ onClick={sessionData ? () => void signOut() : () => void signIn()}
        label={sessionData ? "Sign out" : "Sign in"}
      />
    </div>
  );
};

export default AuthShowcase;
