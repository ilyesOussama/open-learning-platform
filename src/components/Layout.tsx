import Navbar from "./Navbar";
import type { FC, ReactNode } from "react";
import ThemeButton from "./ThemeButton";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
