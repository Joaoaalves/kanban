import SidePanel from "@/components/SidePanel";
import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import { BoardsProvider } from "@/contexts/BoardsProvider";

export default function Home() {
  return (
    <main
      className={`bg-light-bg dark:bg-dark-bg flex items-center gap-y-8 h-screen w-screen ${font.className}`}
    >
      <BoardsProvider>
        <SidePanel />
      </BoardsProvider>
    </main>
  );
}
