// Get of the page elements reference to manipulate later

const inputText = document.getElementById('inputText');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const listTodo = document.getElementById('todoList');
let countTasks = document.getElementById('countTasks');

let listArray = [];
let tasks = 0;

addButton.addEventListener('click', addNewTask);
clearButton.addEventListener('click', clearTasks);

function addNewTask() {

    listArray = listTodo;
    listArray.innerHTML += "<li>Teste</li>";
    tasks++;
    countTasks.innerHTML = `<span style="color:red"> ${tasks} </span>`;
}

function clearTasks() {

    let opt = false;

    if (tasks != 0) {
        opt = confirm("You have one or more tasks created.\n Are you sure you want to continue?");
    } else {
        alert("You don't have any task created.");
    }

    if (opt != false) {
        tasks = 0;
        countTasks.innerHTML = 0;
        listArray.innerHTML = '';
    }

}