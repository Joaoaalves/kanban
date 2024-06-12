import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteTask as deleteTaskAPI } from "@/data/tasks"

export default function useTask(taskId) {
    const queryClient = useQueryClient()

    const { mutateAsync: deleteTask } = useMutation({
        mutationFn: () => deleteTaskAPI(taskId),
        onSuccess: () => queryClient.setQueryData(["task", taskId], null)
    })

    const { data: task } = useQuery({
        queryFn: () => queryClient.getQueryData(["task", taskId]),
        queryKey: ["task", taskId],
        enabled: !!taskId
    })

    const subtasks = task?.subTasks.map(sub => {
        return useQuery({
            queryKey: ["subTask", sub._id],
            queryFn: () => queryClient.getQueryData(["subTask", sub._id]),
            enabled: !!sub._id,
        }).data;
    }) || [];

    const totalSubtasksCompleted = () => {
        return subtasks.filter(sub => sub?.isCompleted).length;
    };

    return { task, totalSubtasksCompleted, deleteTask }
}