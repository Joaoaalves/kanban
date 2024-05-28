import { createContext, useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoards, createBoard } from "@/data/boards";
import { createTask } from "@/data/tasks";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const { data: boards } = useQuery({
        queryFn: getBoards,
        queryKey: ['boards']
    });

    const { mutateAsync: createBoardFn } = useMutation({
        mutationFn: createBoard,
        onSuccess: (_, variables, context) => {
            queryClient.setQueryData(['boards'], data => {
                return [...data, {
                    ...variables,
                    tasks: [], // Adiciona uma propriedade `tasks` vazia ao novo board
                    columns: [] // Adiciona uma propriedade `columns` vazia ao novo board, se necessário
                }];
            });
        }
    });

    const { mutateAsync: createTaskFn } = useMutation({
        mutationFn: async ({ task, boardId }) => {
            await createTask(task, boardId);
            return { task, boardId };
        },
        onSuccess: ({ task, boardId }) => {
            queryClient.setQueryData(['boards'], boards => {
                return boards.map(board => {
                    if (board._id === boardId) {
                        return {
                            ...board,
                            columns: board.columns.map(column => {
                                if (column._id === task.status) {
                                    return {
                                        ...column,
                                        tasks: [...column.tasks, task]
                                    };
                                }
                                return column;
                            })
                        };
                    }
                    return board;
                });
            });
        }
    });

    const getBoard = (boardId) => {
        return boards?.find(board => board._id === boardId);
    };

    const handleCreateBoard = async (board) => {
        try {
            await createBoardFn(board);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateTask = async (task, boardId) => {
        try {
            await createTaskFn({ task, boardId });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <BoardsContext.Provider value={{ boards, handleCreateBoard, getBoard, handleCreateTask }}>
            {children}
        </BoardsContext.Provider>
    );
};

export const useBoards = () => useContext(BoardsContext);
