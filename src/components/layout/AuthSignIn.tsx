import { ActionIcon, Button, useMantineTheme } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { Logout } from "tabler-icons-react";

const AuthSignIn: React.FC = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  return (
    <div>
      {sessionData ? (
        <ActionIcon
          variant="outline"
          size="lg"
          style={{
            border: dark
              ? `2px solid ${theme.colors.violet[9]}`
              : `2px solid ${theme.colors.violet[6]}`,
            backgroundColor: dark
              ? theme.colors.violet[9]
              : theme.colors.violet[6],
          }}
          onClick={() =>
            void signOut({
              callbackUrl: "/",
            })
          }
        >
          <Logout size="1.5rem" color="white" />
        </ActionIcon>
      ) : (
        <Button
          variant="filled"
          onClick={() =>
            void signIn("undefined", {
              callbackUrl: "/homepage",
            })
          }
          style={{
            backgroundColor: theme.colors.blue[9],
          }}
        >
          {!sessionData && "Sign in"}
        </Button>
      )}
    </div>
  );
};

export default AuthSignIn;
