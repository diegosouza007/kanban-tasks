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

// Check if there are data in the localStorage and if it exists rebuilds the list

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

// Return the ID from the last task add

function getLastElementId() {

    const lastIndex = tasks.length - 1;
    const lastArrayElement = tasks.filter((content, index) => index == lastIndex);
    const idNumber = lastArrayElement[0].id;
    return idNumber;
}

// Create a new task when the user add

function addNewTask() {
    for (let field in inputText) {
        if (inputText[field].value != '') {

            if (field == 0) {
                let task = createNewTask(inputText[field].value, "todolist");
                tasks.push(task);
                liTasks[field].innerHTML += `<li id="${getLastElementId()}" onclick="deleteTask(this)">${inputText[field].value}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;

                inputText[field].value = '';

            } else if (field == 1) {
                let task = createNewTask(inputText[field].value, "doinglist");
                liTasks[field].innerHTML += `<li id="${getLastElementId()}" onclick="deleteTask(this)">${inputText[field].value}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                tasks.push(task);

                inputText[field].value = '';
            } else {
                let task = createNewTask(inputText[field].value, "donelist");
                liTasks[field].innerHTML += `<li id="${getLastElementId()}" onclick="deleteTask(this)">${inputText[field].value}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                tasks.push(task);

                inputText[field].value = '';
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

// Fuction to delete the specific task choosen by the user

function deleteTask(task) {


    let storage = localStorage.getItem("Tasks");
    let tasks = JSON.parse(storage);

    tasks = tasks.filter(value => value.id != task.getAttribute('id'));
    localStorage.setItem("Tasks", JSON.stringify(tasks));


    tasks = null;



    countTasks.innerHTML = 0;
    liTasks[0].innerHTML = '';
    liTasks[1].innerHTML = '';
    liTasks[2].innerHTML = '';

    updateTasksList();

}

// Function to remove all tasks created by the user

function clearTasks() {

    let option = false;

    if (tasks != 0) {
        option = confirm("You have one or more tasks created.\n\nAre you sure you want to continue?");
    } else {
        alert("You don't have any task created yet.");
    }

    if (option) {

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

    let storage = localStorage.getItem("Tasks");
    let tasks = JSON.parse(storage);

    if (tasks != null) {
        for (let task in tasks) {
            if (tasks[task].tag == "todolist") {
                liTasks[0].innerHTML += `<li id="${tasks[task].id}" onclick="deleteTask(this)">${tasks[task].content}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                tasks.push(tasks[task]);
            } else if (tasks[task].tag == "doinglist") {
                liTasks[1].innerHTML += `<li id="${tasks[task].id}" onclick="deleteTask(this)">${tasks[task].content}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                tasks.push(tasks[task]);
            } else {
                liTasks[2].innerHTML += `<li id="${tasks[task].id}" onclick="deleteTask(this)">${tasks[task].content}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                tasks.push(tasks[task]);
            }
        }
    }
    if (tasks != null) {
        countTasks.innerHTML = `<span style="color:#f94144"> ${tasks.length} </span>`;
    }
}

// Generate a random ID to identify each task

function generateId() {

    let id = "";

    for (let x = 0; x < 6; x++) {
        id += Math.floor(Math.random() * 10);
    }

    return id;

}