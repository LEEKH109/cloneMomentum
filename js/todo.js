const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = [];
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}
function deleteCheckedItem(event) {
  if (event.target.checked) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }
}

function toggleEditMode(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const text = span.innerText;

  const input = document.createElement("input");
  input.type = "text";
  input.value = text;

  input.addEventListener("blur", function () {
    span.innerText = input.value;
    const toDoObj = toDos.find((toDo) => toDo.id === parseInt(li.id));
    toDoObj.text = input.value;
    saveToDos();

    li.replaceChild(span, input);
  });

  li.replaceChild(input, span);
  input.focus();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", deleteCheckedItem);

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", toggleEditMode);

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(editButton);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}
toDoForm.addEventListener("submit", handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
