import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

import { useRouter } from "next/router";
import { BoardProvider } from "@/contexts/BoardProvider";

import Board from "@/components/Board";
import Panel from "@/components/Panel";
import TopBar from "@/components/TopBar";
import { authUser } from "@/lib/clientAuth";
import { Toaster } from "@/components/ui/sonner";

export const getServerSideProps = async (context) => authUser(context);

export default function Page() {
  const router = useRouter();
  const boardId = router.query.boardId;

  if (!boardId) {
    return <h1>Board not found...</h1>;
  }

  return (
    <BoardProvider boardId={boardId}>
      <Panel>
        <div className="col-span-4 flex max-h-screen flex-col">
          <TopBar />
          <Board />
        </div>
        <Toaster />
      </Panel>
    </BoardProvider>
  );
}
