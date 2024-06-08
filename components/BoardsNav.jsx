"use client";
import Image from "next/image";
import ItemNav from "./ItemNav";
import NewBoard from "./NewBoard";
import useBoards from "@/hooks/useBoards";
import { useRouter } from "next/router";

export default function BoardsNav() {
  const { boards } = useBoards();

  return (
    <div className="flex w-full flex-col self-start pe-6">
      <span className="mb-5 ms-8 text-[12px] font-bold text-medium-grey">
        ALL BOARDS ({boards?.length})
      </span>

      <nav className="flex w-full flex-col items-start">
        {boards?.map((board) => (
          <BoardLink key={board._id} board={board} isActive={board._id === 1} />
        ))}
        <NewBoard>
          <ItemNav className={"text-purple"}>
            <Image
              src={"/images/icon-board.svg"}
              width={16}
              height={16}
              alt="Board Icon"
              className={`purple-filter transition-all duration-300 group-hover:!brightness-200`}
            />
            + Create New Board
          </ItemNav>
        </NewBoard>
      </nav>
    </div>
  );
}

function BoardLink({ board, isActive }) {
  const router = useRouter();

  const onClick = () => {
    return router.push(`/boards/${board._id}`);
  };
  return (
    <ItemNav isActive={isActive} onClick={onClick}>
      <Image
        src={"/images/icon-board.svg"}
        width={16}
        height={16}
        alt="Board Icon."
        className={`transition-all duration-300 group-hover:brightness-200 ${isActive ? "brightness-200" : ""}`}
      />
      {board.name}
    </ItemNav>
  );
}
