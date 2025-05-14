const form = document.querySelector("form");
const input = document.querySelector('input[type = "text"]');
const todoList = document.getElementById("todo-list");

let tasks = [];

// Véréficitation de l'existence d'une tâche
if (localStorage.getItem("todos")) {
  // récupération des données et convertion en tableau
  tasks = JSON.parse(localStorage.getItem("todos"));

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", () => {
      todoList.removeChild(li);

      tasks = tasks.filter((t) => t !== task);
      localStorage.setItem("todos", JSON.stringify(tasks));
    });

    todoList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = input.value.trim();

  if (task !== "") {
    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", () => {
      todoList.removeChild(li);
      tasks = tasks.filter((t) => t !== task);
      localStorage.setItem("todos", JSON.stringify(tasks));
    });

    todoList.appendChild(li);
    tasks.push(task), localStorage.setItem("todos", JSON.stringify(tasks));
  }

  input.value = "";
});

// TOTAL 147 LIGNES - 3h
