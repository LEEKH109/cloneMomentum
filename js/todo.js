const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteCheckedItem(event) {
  if (event.target.checked) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }
}

function spanToInput(event) {
  const span = event.target;
  if (span.tagName !== "SPAN") return;
  const li = span.parentElement;
  const editButton = li.querySelector("button");
  toggleEditMode({ target: editButton });
}

function inputToSpan(event) {
  if (event.key === "Enter" || event.type === "click") {
    const li = event.target.parentElement;
    const input = li.querySelector("input[type='text']");
    const span = document.createElement("span");
    span.innerText = input.value;
    span.addEventListener("click", spanToInput);
    li.replaceChild(span, input);
    toDos.find((toDo) => toDo.id === parseInt(li.id)).text = input.value;
    saveToDos();
    li.querySelector("button").innerText = "Edit";
  }
}

function toggleEditMode(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const input = li.querySelector("input[type='text']");

  if (input) {
    const newSpan = document.createElement("span");
    newSpan.innerText = input.value;
    newSpan.addEventListener("click", spanToInput);
    li.replaceChild(newSpan, input);
    toDos.find((toDo) => toDo.id === parseInt(li.id)).text = input.value;
    saveToDos();
    event.target.innerText = "Edit";
  } else if (span) {
    const newText = document.createElement("input");
    newText.type = "text";
    newText.value = span.innerText;
    newText.addEventListener("keydown", inputToSpan);
    li.replaceChild(newText, span);
    event.target.innerText = "Done";
    newText.focus();
  }
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.addEventListener("click", spanToInput);

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
