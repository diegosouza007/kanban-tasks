const inputTextTodo = document.getElementById('todoInput');

const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');

const todoLi = document.getElementById('todoList');

let countTasks = document.getElementById('countTasks');

let tasks = 0;

// Capture action when the user clicks in some button on the page

addButton.addEventListener('click', addNewTask);
clearButton.addEventListener('click', clearTasks);

// This code part permits the user to press the Enter key in your keyboard instead of mouse click in add button for add task too

inputTextTodo.addEventListener('keydown', function(e) {
    if (e.key == "Enter") {
        addNewTask();
    }
});

// Function to create the tasks

function addNewTask() {

    if (inputTextTodo.value == '') {
        alert("Insert at least one or more words.");
    } else {

        todoLi.innerHTML += `<li>${inputTextTodo.value}</li>`;
        tasks++;
        countTasks.innerHTML = `<span style="color:#f94144"> ${tasks} </span>`;
        inputTextTodo.value = '';

    }
}

// Function to remove all tasks created by the user

function clearTasks() {

    let option = false;

    if (tasks != 0) {
        option = confirm("You have one or more tasks created.\n\n Are you sure you want to continue?");
    } else {
        alert("You don't have any task created yet.");
    }

    if (option != false) {
        tasks = 0;
        countTasks.innerHTML = 0;
        todoLi.innerHTML = '';
    }

}