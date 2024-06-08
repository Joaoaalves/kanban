import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import Login from "@/components/Login";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main
      className={`flex h-screen flex-col items-center justify-center gap-y-8 bg-light-bg dark:bg-dark-bg ${font.className}`}
    >
      <Logo />
      <Login />
    </main>
  );
}
