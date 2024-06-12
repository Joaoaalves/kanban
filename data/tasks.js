export async function createTask(task, boardId) {
  try {
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    const res = await fetch("/api/task", {
      method: "DELETE",
      body: JSON.stringify({ _id: taskId }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await res.json()

    return data?.task
  } catch (error) {
    console.log(error)
  }
}