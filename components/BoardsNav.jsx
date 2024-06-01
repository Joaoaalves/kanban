"use client";
import Image from "next/image";
import ItemNav from "./ItemNav";
import NewBoard from "./NewBoard";
import { useBoards } from "@/contexts/BoardsProvider";
import { useRouter } from "next/router";

export default function BoardsNav() {
  const { boards } = useBoards();

  return (
    <div className="flex flex-col self-start w-full pe-6">
      <span className="text-[12px] text-medium-grey ms-8 font-bold mb-5">
        ALL BOARDS ({boards?.length})
      </span>

      <nav className="flex flex-col items-start w-full">
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
              className={`group-hover:!brightness-200 transition-all duration-300 purple-filter`}
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
    return router.push(`/boards/board/${board._id}`);
  };
  return (
    <ItemNav isActive={isActive} onClick={onClick}>
      <Image
        src={"/images/icon-board.svg"}
        width={16}
        height={16}
        alt="Board Icon."
        className={`group-hover:brightness-200 transition-all duration-300 ${isActive ? "brightness-200" : ""}`}
      />
      {board.name}
    </ItemNav>
  );
}
