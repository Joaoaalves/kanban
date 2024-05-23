import Image from "next/image"
import ItemNav from "./ItemNav"
const placeholderBoards = [
    {
        _id: 1,
        name: 'Platform Launch'
    },
    {
        _id: 2,
        name: 'Marketing Plan'
    },
    {
        _id: 3,
        name: 'Roadmap'
    },
]


export default function BoardsNav(){

    return (
        <div className="flex flex-col self-start w-full pe-6">
            <span className="text-[12px] text-medium-grey ms-8 font-bold mb-5">ALL BOARDS ({placeholderBoards.length})</span>

            <nav className="flex flex-col items-start w-full">
                {placeholderBoards && placeholderBoards.map(board => (
                    <BoardLink key={board._id} board={board} isActive={board._id === 1}/>
                ))}

                <ItemNav className={'text-purple'}>
                    <Image src={'/images/icon-board.svg'} width={16} height={16} alt="Board Icon" className={`group-hover:!brightness-200 transition-all duration-300 purple-filter`}/>
                    + Create New Board
                </ItemNav>
            </nav>
        </div>
    )
}

function BoardLink({board, isActive}){
    return (
        <ItemNav isActive={isActive}>
            <Image src={'/images/icon-board.svg'} width={16} height={16} alt="Board Icon." className={`group-hover:brightness-200 transition-all duration-300 ${isActive ? 'brightness-200' : ''}`} />
             {board.name}
        </ItemNav>

    )
}