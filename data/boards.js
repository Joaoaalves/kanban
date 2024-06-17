import { GET, POST, PUT, DELETE } from "@/lib/fetchClient";

export const getBoards = async () => {
  try {
    const res = await GET("/api/board");

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
    const res = await GET(`/api/board/${boardId}`);

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
    const res = await POST("/api/board", board);
    const data = await res.json();
    return data.board;
  } catch (error) {
    console.error(error);
  }
}

export async function editBoard(board) {
  try {
    const res = await PUT(`/api/board/${board._id}`, board);
    const data = await res.json();
    return data.board;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBoard(boardId) {
  try {
    const res = await DELETE(`/api/board/${boardId}`);

    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function createColumn(column, boardId) {
  try {
    const res = await POST("/api/column", { ...column, boardId });
    const data = await res.json();
    return data.column;
  } catch (error) {
    console.log(error);
  }
}

export async function updateColumn(column) {
  try {
    const res = await PUT("/api/column", column);
    const data = await res.json();
    return data.column;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBoard(board) {
  try {
    const res = await PUT("/api/board", board);

    const data = await res.json();
    return data.board;
  } catch (error) {
    console.error("Failed to update board:", error);
  }
}

export async function updateBoardColumns({ boardId, columns }) {
  try {
    PUT(`/api/board/${boardId}`, columns);
  } catch (error) {
    console.error("Failed to update board columns:", error);
  }
}
