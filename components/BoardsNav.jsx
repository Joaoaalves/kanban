'use client'
import Image from "next/image"
import ItemNav from "./ItemNav"
import { NewBoardDialog } from "./NewBoardDialog"
import {useState, useEffect} from 'react'

export default function BoardsNav(){    
    const [boards, setBoards] = useState([])
    useEffect(() => {
        const fetchBoards = async () => {
            const res = await fetch('/api/board')
            const data = await res.json()
            setBoards(data?.boards)
        }

        fetchBoards()
    }, [])

    return (
        <div className="flex flex-col self-start w-full pe-6">
            <span className="text-[12px] text-medium-grey ms-8 font-bold mb-5">ALL BOARDS ({boards.length})</span>

            <nav className="flex flex-col items-start w-full">
                {boards && boards.map(board => (
                    <BoardLink key={board._id} board={board} isActive={board._id === 1}/>
                ))}
                <NewBoardDialog>
                    <ItemNav className={'text-purple'}>
                        <Image src={'/images/icon-board.svg'} width={16} height={16} alt="Board Icon" className={`group-hover:!brightness-200 transition-all duration-300 purple-filter`}/>
                        + Create New Board
                    </ItemNav>
                </NewBoardDialog>

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