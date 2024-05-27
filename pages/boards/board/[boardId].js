import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import { useRouter } from "next/router";
import { BoardsProvider } from "@/contexts/BoardsProvider";

import Board from "@/components/Board";
import SidePanel from "@/components/SidePanel";

export default function Page(){
    const router = useRouter();
    const boardId = router.query.boardId;

    if(!boardId){
        return <h1>Board not found...</h1>
    }

    return (
        <main
        className={`bg-light-bg dark:bg-dark-bg flex items-center gap-y-8 gap-x-8 h-screen w-screen ${font.className}`}
        >
            <BoardsProvider>
              <SidePanel />
              <Board boardId={boardId} />
            </BoardsProvider>
          </main>
    )
}