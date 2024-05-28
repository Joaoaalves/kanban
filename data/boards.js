export const getBoards = async () => {
  try {
    const res = await fetch("/api/board", {
      cache: "no-cache",
    });
    const data = await res.json();

    if (data?.boards) {
      return data.boards;
    }
  } catch (error) {
    console.error("Failed to fetch boards:", error);
  }
};

export async function createBoard(board) {
  try {
    const res = await fetch("/api/board", {
      method: "POST",
      body: JSON.stringify(board),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.board;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBoard(board) {
  try {
    const res = await fetch(`/api/board`, {
      method: "PUT",
      body: JSON.stringify(board),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.board;
  } catch (error) {
    console.error("Failed to update board:", error);
  }
}

export async function updateBoardColumns({ boardId, columns }) {
  try {
    await fetch(`/api/board/${boardId}`, {
      method: "PUT",
      body: JSON.stringify({ columns }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to update board columns:", error);
  }
}
