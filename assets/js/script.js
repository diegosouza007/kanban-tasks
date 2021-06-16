// Getting all input text references to manipulate later

const inputTextTodo = document.getElementById('todoInput');
const inputTextDoing = document.getElementById('doingInput');
const inputTextDone = document.getElementById('doneInput');

// Getting the button references 

const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');

// Reference to  unordered list (ul)

const todoLi = document.getElementById('todoList');

// Reference to <span> element to show the number of tasks created 

let countTasks = document.getElementById('countTasks');

let tasks = 0;

addButton.addEventListener('click', addNewTask);
clearButton.addEventListener('click', clearTasks);

function addNewTask() {

    if (inputTextTodo.value == '') {
        alert("Insert at least two or more words.");
    } else {

        todoLi.innerHTML += `<li>${inputTextTodo.value}</li>`;
        tasks++;
        countTasks.innerHTML = `<span style="color:#f94144"> ${tasks} </span>`;
        inputTextTodo.value = '';

    }
}

function clearTasks() {

    let option = false;

    if (tasks != 0) {
        option = confirm("You have one or more tasks created.\n Are you sure you want to continue?");
    } else {
        alert("You don't have any task created yet.");
    }

    if (option != false) {
        tasks = 0;
        countTasks.innerHTML = 0;
        todoLi.innerHTML = '';
    }

}