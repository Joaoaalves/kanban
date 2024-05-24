import { createContext, useEffect, useState, useContext } from "react";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);

    const getBoards = async () => {
        try {
            const res = await fetch('/api/board', {
                cache: 'force-cache'
            });
            const data = await res.json();

            if (data?.boards) {
                setBoards(data.boards);
            }
        } catch (error) {
            console.error("Failed to fetch boards:", error);
        }
    };

    async function addBoard(board){
        try {
            fetch('/api/board', {
                method: 'POST',
                body: JSON.stringify(board),
                headers: {
                  'Content-Type': 'application/json',
                },
            }).then((res) => {
                setBoards([...boards, board])
            })

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(boards.length === 0)
            getBoards();
    }, []);

    return (
        <BoardsContext.Provider value={{ boards, addBoard }}>
            {children}
        </BoardsContext.Provider>
    );
};

export const useBoards = () => useContext(BoardsContext);