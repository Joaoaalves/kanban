import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import { useRouter } from "next/router";
import { BoardProvider } from "@/contexts/BoardProvider";

import Board from "@/components/Board";
import Panel from "@/components/Panel";
import TopBar from "@/components/TopBar";
import { authUser } from "@/lib/clientAuth";

export const getServerSideProps = async (context) => authUser(context)

export default function Page() {
  const router = useRouter();
  const boardId = router.query.boardId;

  if (!boardId) {
    return <h1>Board not found...</h1>;
  }

  return (
    <Panel>
      <BoardProvider boardId={boardId}>
        <div className="col-span-4 flex flex-col max-h-screen">
          <TopBar />
          <Board />
        </div>
      </BoardProvider>
    </Panel>
  );
}
