import clsx from "clsx";
import { useTheme } from "next-themes";
import * as React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

type ThemeButtonProps = React.ComponentPropsWithoutRef<"button">;

const ThemeButton = ({ className, ...rest }: ThemeButtonProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className={clsx(
        "rounded-md p-2 focus:outline-none md:p-2.5",
        "border dark:border-gray-600",
        "hover:border-primary-300 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-300",
        "focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:border-primary-300 dark:focus-visible:text-primary-300",
        "text-lg md:text-xl",
        className
      )}
      {...rest}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-g dark:bg-slate-50" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeButton;
