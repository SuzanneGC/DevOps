document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("newTache");
    const addTaskBtn = document.getElementById("valider");
    const taskList = document.getElementById("taches");

    const form = document.getElementById("todoForm");

    // Empêcher le rechargement du formulaire
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.addEventListener("click", () => li.classList.toggle("completed"));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => li.remove());

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = "";
    }
});
    