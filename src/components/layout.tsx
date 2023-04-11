import React, { type PropsWithChildren } from "react";
import ThemeToggler from "./toggleColorScheme";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex h-16 items-center justify-end border-b-2 border-gray-600">
        <ThemeToggler />
      </div>

      {children}
    </>
  );
};

export default Layout;
