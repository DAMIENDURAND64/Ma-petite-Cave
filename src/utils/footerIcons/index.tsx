import { Avatar, useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { FaChartBar } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { RiAddCircleFill } from "react-icons/ri";

export const UseFooterIcons = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const handleNavigationAddWine = () => {
    router.push("/wines/add").catch((err) => console.log(err));
  };
  const handleNavigationHome = () => {
    router.push("/homepage").catch((err) => console.log(err));
  };
  const handleNavigationProfil = () => {
    router.push("/profil").catch((err) => console.log(err));
  };
  const handleNavigationStats = () => {
    router.push("/stats").catch((err) => console.log(err));
  };
  return [
    {
      name: "Home",
      icon: <HiOutlineHome size="2rem" onClick={handleNavigationHome} />,
    },
    {
      name: "Profil",
      icon: sessionData ? (
        <Avatar
          src={sessionData.user.image}
          alt="profile picture"
          radius="xl"
          size="35px"
          onClick={handleNavigationProfil}
        />
      ) : (
        <CgProfile size="2rem" style={{}} />
      ),
    },
    {
      name: "Stats",
      icon: <FaChartBar size="2rem" onClick={handleNavigationStats} />,
    },
    {
      name: "Ajouter un vin",
      icon: (
        <RiAddCircleFill
          color={
            theme.colorScheme === "dark"
              ? theme.colors.violet[9]
              : theme.colors.violet[6]
          }
          style={{ backgroundColor: "white", borderRadius: "50%" }}
          size="2rem"
          onClick={handleNavigationAddWine}
        />
      ),
    },
  ];
};
