import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import Login from "@/components/Login";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className={`bg-light-bg dark:bg-dark-bg flex flex-col gap-y-8 items-center justify-center h-screen ${font.className}`}
    >
      <Image src={'/images/logo-dark.svg'} width={200} height={34} alt="Logo Kanban"/>
      <Login />
    </main>
  );
}