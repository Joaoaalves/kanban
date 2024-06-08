import { useTheme } from "next-themes";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="mt-auto flex items-center justify-center gap-x-6 rounded-md bg-light-bg px-8 py-[14px] dark:bg-dark-bg lg:px-16">
      <Image
        width={20}
        height={20}
        src={"/images/icon-light-theme.svg"}
        alt="Light Mode Icon"
      />
      <Switch
        value={theme === "dark"}
        onClick={toggleDarkMode}
        className="switch !bg-purple"
      />
      <Image
        width={20}
        height={20}
        src={"/images/icon-dark-theme.svg"}
        alt="Dark Mode Icon"
      />
    </div>
  );
}
