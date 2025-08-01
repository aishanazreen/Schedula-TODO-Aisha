const API_URL = "https://dummyjson.com/todos";
const todoList = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const searchInput = document.getElementById("search-input");

let todos = [];

async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    todos = data.todos.sort(() => 0.5 - Math.random()).slice(0, 5);
    renderTodos();
  } catch (err) {
    alert("Failed to load todos. Showing sample tasks.");
    console.error(err);
    // fallback data
    todos = [
      { id: 1, todo: "Learn HTML", completed: false },
      { id: 2, todo: "Study JavaScript", completed: true },
      { id: 3, todo: "Build a project", completed: false },
    ];
    renderTodos();
  }
}

function renderTodos(filtered = todos) {
  todoList.innerHTML = "";
  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item todo-item" + (todo.completed ? " completed" : "");
    li.innerHTML = `
      <div class="form-check d-flex align-items-center w-100">
        <input class="form-check-input me-2" type="checkbox" ${
          todo.completed ? "checked" : ""
        } onchange="toggleComplete(${todo.id})">
        <span>${todo.todo}</span>
        <button class="btn btn-sm btn-danger ms-auto delete-btn" onclick="deleteTodo(${
          todo.id
        })">X</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const title = todoInput.value.trim();
  if (title === "") {
    alert("Please enter a task.");
    return;
  }

  const newTodo = {
    id: Date.now(),
    todo: title,
    completed: false,
  };

  todos.push(newTodo);
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(query)
  );
  renderTodos(filtered);
});

function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

fetchTodos();
