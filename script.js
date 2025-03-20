document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("newTache");
    const addTaskBtn = document.getElementById("valider");
    const taskList = document.getElementById("taches");

    const form = document.getElementById("todoForm");

    loadTasks();

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


    // Sauvegarder toutes les tâches dans le localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll("#taskList li");

        taskItems.forEach((item) => {
            tasks.push({
                text: item.querySelector("span").textContent,
                completed: item.classList.contains("completed")
            });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Charger les tâches depuis le localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));

        if (savedTasks) {
            savedTasks.forEach(task => {
                const li = document.createElement("li");
                if (task.completed) {
                    li.classList.add("completed");
                }

                const taskSpan = document.createElement("span");
                taskSpan.textContent = task.text;
                taskSpan.addEventListener("click", () => {
                    li.classList.toggle("completed");
                    saveTasks();  // Sauvegarder après modification
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", () => {
                    li.remove();
                    saveTasks();  // Sauvegarder après suppression
                });

                li.appendChild(taskSpan);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    }

});
    