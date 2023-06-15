import React, { type PropsWithChildren } from "react";
import ThemeToggler from "../darkTheme/toggleColorScheme";
import AuthSignIn from "./AuthSignIn";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { ActionIcon, Avatar, Modal, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { FaChartBar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi";
import { RiAddCircleFill } from "react-icons/ri";
import { motion } from "framer-motion";
import SearchBar from "../searchBar/searchBar";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Layout = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();

  const { data: sessionData } = useSession();

  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

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

  const footerIcons = [
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
  return (
    <>
      <div
        className="w-full"
        style={{
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.dark[1],
        }}
      >
        <div className="flex h-32 justify-between  p-3">
          <div className="flex ">
            <Logo />
          </div>
          {sessionData ? (
            <div className="flex flex-col items-end justify-between">
              <div className="flex gap-4">
                <ThemeToggler />
                <AuthSignIn />
              </div>
              <div>
                <ActionIcon
                  size="lg"
                  variant="filled"
                  style={{
                    border:
                      theme.colorScheme === "dark"
                        ? `2px solid ${theme.colors.violet[9]}`
                        : `2px solid ${theme.colors.violet[6]}`,
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.violet[9]
                        : theme.colors.violet[6],
                  }}
                  onClick={open}
                >
                  <IconSearch
                    color={theme.colorScheme === "dark" ? "white" : "black"}
                  />
                </ActionIcon>
                <Modal
                  opened={opened}
                  onClose={close}
                  yOffset={130}
                  withCloseButton={false}
                  radius="md"
                  transitionProps={{
                    transition: "fade",
                    duration: 400,
                    timingFunction: "linear",
                  }}
                  styles={{
                    root: {
                      ".mantine-8jl4qs": {
                        paddingLeft: `12px !important`,
                        paddingRight: `12px !important`,
                      },
                    },
                    body: {
                      padding: 0,
                    },
                  }}
                >
                  <SearchBar />
                </Modal>
              </div>
            </div>
          ) : (
            <div className="flex w-[50%] flex-col items-end justify-between">
              <ThemeToggler />
              <AuthSignIn />
            </div>
          )}
        </div>
      </div>
      <div className="px-3 pb-20 pt-3">{children}</div>
      <div
        className="flexrow xy-center fixed bottom-0 h-16 w-full justify-around border-slate-400"
        style={{
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.dark[1],
        }}
      >
        {footerIcons.map((item) => (
          <motion.div
            whileHover={{ scale: 1.2 }}
            key={item.name}
            className="flexcol xy-center text-[11px]"
          >
            {item.icon}
            <span
              className={
                item.name === "Ajouter un vin"
                  ? theme.colorScheme === "dark"
                    ? "text-[#5F3DC4]"
                    : "text-[#7950F2]"
                  : ""
              }
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Layout;
