import { useBoards } from "@/contexts/BoardsProvider";

export default function Board({boardId}){
    const {getBoard} = useBoards()
    const board = getBoard(boardId)
    
    if(!board)
        return
    
    return (
        <div className="w-full h-screen bg-white dark:bg-dark-grey">
            <h1>{board.name}</h1>
        </div>
    )
}