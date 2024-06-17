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

export async function editTask(task) {
  try {
    const res = await fetch("/api/task", {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      const data = await res.json();
      return data.task
    } else {
      console.log(error("Failed to add task"))
    }
  } catch (error) {
    console.log(error);
  }
}