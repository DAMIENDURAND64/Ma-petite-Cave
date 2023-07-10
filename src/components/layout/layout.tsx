import React, { useState, type PropsWithChildren, useEffect } from "react";
import ThemeToggler from "../darkTheme/toggleColorScheme";
import AuthSignIn from "./AuthSignIn";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import { UseFooterIcons } from "~/utils/footerIcons";
import SearchIconModal from "../searchBar/searchIconModal";

const Layout = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();
  const { data: sessionData } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const footerIcons = UseFooterIcons();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!scrolled || !sessionData ? (
        <div
          className="fixed z-50 h-32 w-full"
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.dark[1],
          }}
        >
          <div className="flex h-32 justify-between p-3">
            <div className="flex ">
              <Logo />
            </div>
            {sessionData ? (
              <div className="flex flex-col items-end justify-between">
                <div className="flex gap-4">
                  <ThemeToggler />
                  <AuthSignIn />
                </div>
                <SearchIconModal scrolled={scrolled} />
              </div>
            ) : (
              <div className="flex w-[50%] flex-col items-end justify-between">
                <ThemeToggler />
                <AuthSignIn />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="fixed z-50 flex w-full justify-between px-3 py-2"
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.dark[1],
          }}
        >
          <h1 className="text-3xl font-extrabold">Ma petite Cave.</h1>
          <SearchIconModal scrolled={scrolled} />
        </div>
      )}
      {/* MAIN APPLICATION START HERE */}
      <div className="pb-20 pt-36">{children}</div>
      {/* MAIN APPLICATION STOP HERE */}
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
