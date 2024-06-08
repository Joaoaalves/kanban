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

export const getBoardById = async (boardId) => {
  try {
    const res = await fetch(`/api/board/${boardId}`);
    if (!res.ok) {
      return { error: `Error: ${res.status} ${res.statusText}` };
    }

    const data = await res.json();
    return data.board;
  } catch (error) {
    return { error: error.message };
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

export async function editBoard(board) {
  try {
    const res = await fetch(`/api/board/${board._id}`, {
      method: "PUT",
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

export async function deleteBoard(boardId) {
  try {
    const res = await fetch(`/api/board/${boardId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function createColumn(column, boardId) {
  try {
    const res = await fetch("/api/column", {
      method: "POST",
      body: JSON.stringify({ ...column, boardId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data.column;
  } catch (error) {
    console.log(error);
  }
}

export async function updateColumn(column) {
  try {
    const res = await fetch("/api/column", {
      method: "PUT",
      body: JSON.stringify(column),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data.column;
  } catch (error) {
    console.log(error);
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
    console.log(boardId, columns)
    await fetch(`/api/board/${boardId}`, {
      method: "PUT",
      body: JSON.stringify(columns),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to update board columns:", error);
  }
}
