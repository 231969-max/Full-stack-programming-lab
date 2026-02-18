function toggleDone(button) {

    const task = button.parentElement;
    task.classList.toggle("completed");

    // Loop through all tasks to style consistently
    const allTasks = document.querySelectorAll(".task");

    allTasks.forEach(t => {
        if (t.classList.contains("completed")) {
            t.style.opacity = "0.6";
        } else {
            t.style.opacity = "1";
        }
    });
}

function removeTask(button) {
    const task = button.parentElement;
    task.remove();
}
