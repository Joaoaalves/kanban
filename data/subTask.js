import { PUT } from "@/lib/fetchClient"

export async function updateSubTask({ subTaskId, isCompleted }) {
    try {
        const res = await PUT('/api/subtask/' + subTaskId, { isCompleted })

        const data = await res.json()

        return data.subTask;
    } catch (err) {
        console.log(err)
    }
}