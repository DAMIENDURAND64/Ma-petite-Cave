import React, { type PropsWithChildren } from "react";
import ThemeToggler from "../darkTheme/toggleColorScheme";
import AuthShowcase from "./AuthShowcase";
import Logo from "./Logo";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex h-32 w-full border-b border-slate-400 p-3">
        <div className="flex w-[50%] justify-start">
          <Logo />
        </div>
        <div className="flex w-[50%] flex-col items-end justify-end gap-3 ">
          <ThemeToggler />
          <AuthShowcase />
        </div>
      </div>

      {children}
    </>
  );
};

export default Layout;
