export const getBoards = async () => {
    try {
        const res = await fetch('/api/board', {
            cache: 'no-cache'
        });
        const data = await res.json();

        if (data?.boards) {
            return data.boards
        }
    } catch (error) {
        console.error("Failed to fetch boards:", error);
    }
};

export async function createBoard(board){
    try {
        fetch('/api/board', {
            method: 'POST',
            body: JSON.stringify(board),
            headers: {
              'Content-Type': 'application/json',
            },
        }).then((res) => {
            return board.board
        })

    } catch (error) {
        console.error(error);
    }
}