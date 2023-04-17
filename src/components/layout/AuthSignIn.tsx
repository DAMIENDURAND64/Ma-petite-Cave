import { Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthSignIn: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <Button
        variant="filled"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
        style={{ backgroundColor: "blue" }}
      >
        {sessionData ? "Sign Out" : "Sign In / Log In"}
      </Button>
    </div>
  );
};

export default AuthSignIn;
