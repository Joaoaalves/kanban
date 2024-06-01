import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import { useRouter } from "next/router";
import { BoardsProvider } from "@/contexts/BoardsProvider";

import Board from "@/components/Board";
import SidePanel from "@/components/SidePanel";
import TopBar from "@/components/TopBar";

export default function Page() {
  const router = useRouter();
  const boardId = router.query.boardId;

  if (!boardId) {
    return <h1>Board not found...</h1>;
  }

  return (
    <main
      className={`bg-light-bg dark:bg-dark-bg flex items-start gap-y-8 h-screen w-screen ${font.className}`}
    >
      <BoardsProvider boardId={boardId}>
        <SidePanel />
        <div className="w-full h-screen flex flex-col">
          <TopBar boardId={boardId} />
          <Board boardId={boardId} />
        </div>
      </BoardsProvider>
    </main>
  );
}
