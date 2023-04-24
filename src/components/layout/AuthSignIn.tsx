import { Button, useMantineTheme } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthSignIn: React.FC = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();

  return (
    <div>
      <Button
        variant="filled"
        onClick={
          sessionData
            ? () =>
                void signOut({
                  callbackUrl: "/",
                })
            : () =>
                void signIn("undefined", {
                  callbackUrl: "/homepage",
                })
        }
        style={{
          backgroundColor: theme.colors.blue[9],
        }}
      >
        {sessionData ? "Sign Out" : "Sign In / Log In"}
      </Button>
    </div>
  );
};

export default AuthSignIn;
