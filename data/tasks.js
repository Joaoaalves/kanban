export async function createTask(task, boardId){
    try {
        const res = await fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const newTask = await res.json();

            return {board: boardId, task: newTask}
        } else {
            console.error("Failed to add task");
        }
    } catch (error) {
        console.error(error);
    }
}