import React, { type PropsWithChildren } from "react";
import ThemeToggler from "../darkTheme/toggleColorScheme";
import AuthSignIn from "./AuthSignIn";
import Logo from "./Logo";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex h-32 w-full border-b border-gray-200 p-3">
        <div className="flex w-[50%] justify-start">
          <Logo />
        </div>
        <div className="flex w-[50%] flex-col items-end justify-between">
          <ThemeToggler />
          <AuthSignIn />
        </div>
      </div>

      {children}
    </>
  );
};

export default Layout;
