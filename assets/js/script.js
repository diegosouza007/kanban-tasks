const addButton = [];

addButton[0] = document.getElementsByClassName("addButton")[0];
addButton[1] = document.getElementsByClassName("addButton")[1];
addButton[2] = document.getElementsByClassName("addButton")[2];

const clearButton = document.getElementById('clearButton');

const inputText = [];

inputText[0] = document.getElementById('todoInput');
inputText[1] = document.getElementById('doingInput');
inputText[2] = document.getElementById('doneInput');

const liTasks = []

liTasks[0] = document.getElementById('todoList');
liTasks[1] = document.getElementById('doingList');
liTasks[2] = document.getElementById('doneList');

const countTasks = document.getElementById('countTasks');

// Array to receive and manage all tasks created

let tasks = [];

// Check if there are data in the localStorage and if it exists rebuilds the list

updateTasksList();

// Capture action when the user clicks with mouse button in plus button on the page

addButton[0].addEventListener('click', addNewTask);
addButton[1].addEventListener('click', addNewTask);
addButton[2].addEventListener('click', addNewTask);

clearButton.addEventListener('click', clearTasks);

// This code part permits the user to press the Enter key in your keyboard instead of mouse click in add button for add a task too

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

// Return the ID from the last task added

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
                liTasks[field].innerHTML += `<li id="${getLastElementId()}">${inputText[field].value}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                inputText[field].value = '';
                console.log(liTasks[field]);
                console.log(inputText[field]);
            } else if (field == 1) {
                let task = createNewTask(inputText[field].value, "doinglist");
                liTasks[field].innerHTML += `<li id="${getLastElementId()}">${inputText[field].value}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
                tasks.push(task);
                inputText[field].value = '';
            } else {
                let task = createNewTask(inputText[field].value, "donelist");
                liTasks[field].innerHTML += `<li id="${getLastElementId()}">${inputText[field].value}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
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

// Operations to delete the specific task choosen by the user

function deleteTasks() {

    // Create an Node List with all trash buttons from tasks created

    let deltask = document.querySelectorAll('.delete-task');

    // loop to capture an action when the user click in some specific task delete button

    for (let i = 0; i < deltask.length; i++) {
        deltask[i].addEventListener('click', function() {

            let id = deltask[i].parentElement.id;
            let storage = localStorage.getItem("Tasks");
            let taskslist = JSON.parse(storage);

            tasks = taskslist.filter(value => value.id != id);
            localStorage.setItem("Tasks", JSON.stringify(tasks));

            updateTasksList();
            window.location.reload();
        });
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

    if (option) {

        tasks = 0;
        countTasks.innerHTML = 0;

        liTasks[0].innerHTML = '';
        liTasks[1].innerHTML = '';
        liTasks[2].innerHTML = '';

        localStorage.clear();

    }
}

// Function to get data in localstorage and rebuild the tasks list

function updateTasksList() {

    let storage = localStorage.getItem("Tasks");
    let taskslist = JSON.parse(storage);
    let todolist = doinglist = donelist = "";
    tasks = [];

    for (let task in taskslist) {
        if (taskslist[task].tag == "todolist") {
            todolist += `<li id="${taskslist[task].id}">${taskslist[task].content}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
            tasks.push(taskslist[task]);
        } else if (taskslist[task].tag == "doinglist") {
            doinglist += `<li id="${taskslist[task].id}">${taskslist[task].content}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
            tasks.push(taskslist[task]);
        } else {
            donelist += `<li id="${taskslist[task].id}">${taskslist[task].content}<img class="delete-task" src="./assets/img/trash-1.svg"/></li>`;
            tasks.push(taskslist[task]);
        }
    }

    liTasks[0].innerHTML = todolist;
    liTasks[1].innerHTML = doinglist;
    liTasks[2].innerHTML = donelist;

    if (tasks != null && tasks != "") {
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

// Rebuild the variable deltask with the delete-task class tag reference

deleteTasks();