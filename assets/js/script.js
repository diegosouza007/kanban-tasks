let addButton = [];

addButton[0] = document.getElementsByClassName("addButton")[0];
addButton[1] = document.getElementsByClassName("addButton")[1];
addButton[2] = document.getElementsByClassName("addButton")[2];

const clearButton = document.getElementById('clearButton');

let inputText = [];

inputText[0] = document.getElementById('todoInput');
inputText[1] = document.getElementById('doingInput');
inputText[2] = document.getElementById('doneInput');

let liTasks = []

liTasks[0] = document.getElementById('todoList');
liTasks[1] = document.getElementById('doingList');
liTasks[2] = document.getElementById('doneList');

let countTasks = document.getElementById('countTasks');
let tasks = 0;

// Capture action when the user clicks in some button on the page

addButton[0].addEventListener('click', addNewTask);
addButton[1].addEventListener('click', addNewTask);
addButton[2].addEventListener('click', addNewTask);

clearButton.addEventListener('click', clearTasks);

// This code part permits the user to press the Enter key in your keyboard instead of mouse click in add button for add task too

inputText[0].addEventListener('keydown', function(e) {
    if (e.key == "Enter") {
        addNewTask();
    }
});

inputText[1].addEventListener('keydown', function(e) {
    if (e.key == "Enter") {
        addNewTask();
    }
});

inputText[2].addEventListener('keydown', function(e) {
    if (e.key == "Enter") {
        addNewTask();
    }
});

// Function to create the tasks

function addNewTask() {

    for (let i in inputText) {

        if (inputText[i].value != '') {

            liTasks[i].innerHTML += `<li>${inputText[i].value}</li>`;
            tasks++;
            countTasks.innerHTML = `<span style="color:#f94144"> ${tasks} </span>`;
            inputText[i].value = '';

        } else {
            continue;
        }
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

        liTasks[0].innerHTML = '';
        liTasks[1].innerHTML = '';
        liTasks[2].innerHTML = '';

    }

}