const form = document.querySelector("form");
const todo = document.getElementById("todo");
const list = document.getElementById("list");

const saveTodos = () => {
  window.localStorage.todoList = list.innerHTML;
};

const loadTodos = () => {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
  } else {
    list.innerHTML = `<li>Vos tâches ! Vos objectifs ! Just do it !</li>`;
  }
};

window.addEventListener("load", loadTodos);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  list.innerHTML += `<li>${todo.value}</li>`;

  todo.value = "";

  saveTodos();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("valid")) {
    e.target.remove();
  } else {
    e.target.classList.add("valid");
  }
  saveTodos();
});
