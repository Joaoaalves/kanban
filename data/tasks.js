import { POST, DELETE } from "@/lib/fetchClient"

export async function createTask(task, boardId) {
  try {
    const res = await POST("/api/task", task)

    if (res.ok) {
      const data = await res.json();
      return data.task
    } else {
      console.error("Failed to add task");
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteTask = async (taskId) => {
  try {
    const res = await DELETE("/api/task", { _id: taskId })

    const data = await res.json()

    return data?.task
  } catch (error) {
    console.log(error)
  }
}