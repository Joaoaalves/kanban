export async function updateSubTask({ subTaskId, isCompleted }) {
    try {
        const res = await fetch('/api/subtask/' + subTaskId, {
            method: "PUT",
            body: JSON.stringify({
                isCompleted
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json()

        return data.subTask;
    } catch (err) {
        console.log(err)
    }
}