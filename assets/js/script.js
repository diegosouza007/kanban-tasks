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

// Array to receive and manage all tasks created

let tasks = [];

// Check if there is data in the localStorage and if it exists rebuilds the list

updateTasksList();

// Capture action when the user clicks with mouse button in plus button on the page

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

// Create a new task when the user add

function addNewTask() {
    for (let i in inputText) {
        if (inputText[i].value != '') {

            if (i == 0) {
                liTasks[i].innerHTML += `<li>${inputText[i].value}</li>`;
                let task = createNewTask(inputText[i].value, "todolist")
                tasks.push(task);
                inputText[i].value = '';
            } else if (i == 1) {
                liTasks[i].innerHTML += `<li>${inputText[i].value}</li>`;
                let task = createNewTask(inputText[i].value, "doinglist")
                tasks.push(task);
                inputText[i].value = '';
            } else {
                liTasks[i].innerHTML += `<li>${inputText[i].value}</li>`;
                let task = createNewTask(inputText[i].value, "donelist")
                tasks.push(task);
                inputText[i].value = '';
            }
        } else {
            continue;
        }
    }
    countTasks.innerHTML = `<span style="color:#f94144"> ${tasks.length} </span>`;
    localStorage.setItem("Tasks", JSON.stringify(tasks));
}

// Object constructor of the list elements

function createNewTask(content, tag) {
    return {
        id: generateId(),
        content: content,
        tag: tag
    }
}

// Function to remove all tasks created by the user

function clearTasks() {

    let option = false;

    if (tasks != 0) {
        option = confirm("You have one or more tasks created.\n\nAre you sure you want to continue?");
    } else {
        alert("You don't have any task created yet.");
    }

    if (option != false) {

        tasks = 0;
        countTasks.innerHTML = 0;

        liTasks[0].innerHTML = '';
        liTasks[1].innerHTML = '';
        liTasks[2].innerHTML = '';

        localStorage.clear();

    }
}

// Function to check if exists data in localstorage and rebuild the tasks list

function updateTasksList() {

    let l = localStorage.getItem("Tasks");
    let persistence = JSON.parse(l);

    if (persistence != null) {
        for (let x in persistence) {
            if (persistence[x].tag == "todolist") {
                liTasks[0].innerHTML += `<li>${persistence[x].content}</li>`;
                tasks.push(persistence[x]);
            } else if (persistence[x].tag == "doinglist") {
                liTasks[1].innerHTML += `<li>${persistence[x].content}</li>`;
                tasks.push(persistence[x]);
            } else {
                liTasks[2].innerHTML += `<li>${persistence[x].content}</li>`;
                tasks.push(persistence[x]);
            }
        }
    }
    if (persistence != null) {
        countTasks.innerHTML = `<span style="color:#f94144"> ${persistence.length} </span>`;
    }
}

// Generate a random ID to identify each task

function generateId() {
    
    let id = "";

    for (let x = 0; x < 6; x++) {
        id += Math.floor(Math.random()* 10);
    }

    return id;

}