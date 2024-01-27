let textField = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}

getDataFromLocalStoragee();

submit.onclick = function () {
  if (textField.value !== "") {
    addTaskToArray(textField.value);
    textField.value = "";
  }
};

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addTaskToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasks.innerHTML = "";
  arrayOfTasks.forEach(function (task) {
    let div = document.createElement("div");
    div.className = "task";

    div.setAttribute("id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    span.onclick = function () {
      removeTaskById(task.id);
      removeTaskInLocalStorage(task.id);
    };
    div.onclick = function () {
      if (div.classList.contains("done")) {
        div.classList.remove("done");
        task.completed = false;
      } else {
        div.className = "task done";
        task.completed = true;
      }
      updateTaskInLocalStorage(task);
    };
    div.appendChild(span);
    tasks.appendChild(div);
  });
}

function removeTaskById(id) {
  arrayOfTasks = arrayOfTasks.filter(function (task) {
    return task.id !== id;
  });
  addElementsToPageFrom(arrayOfTasks);
}

function addTaskToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

function removeTaskInLocalStorage(id) {
  let storedTasks = JSON.parse(window.localStorage.getItem("Tasks"));
  storedTasks = storedTasks.filter(function (task) {
    return task.id !== id;
  });
  window.localStorage.setItem("Tasks", JSON.stringify(storedTasks));
}

function getDataFromLocalStoragee() {
  let data = localStorage.getItem("Tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function updateTaskInLocalStorage(task) {
  let storedTasks = JSON.parse(window.localStorage.getItem("Tasks"));
  storedTasks.forEach(function (storedTask, index) {
    if (storedTask.id === task.id) {
      storedTasks[index] = task;
    }
  });
  window.localStorage.setItem("Tasks", JSON.stringify(storedTasks));
}
