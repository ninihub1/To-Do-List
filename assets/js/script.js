// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage when the app starts
window.addEventListener("load", loadTasks);

// Add a new task
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new task item
    const taskItem = createTaskItem(taskText);

    // Append to the list
    taskList.appendChild(taskItem);

    // Save the task to LocalStorage
    saveTaskToLocalStorage(taskText);

    // Clear input field
    taskInput.value = "";
}

// Create a task DOM element
function createTaskItem(taskText, isComplete = false) {
    const taskItem = document.createElement("li");
    taskItem.className = `task ${isComplete ? "complete" : ""}`;

    // Task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    taskItem.appendChild(taskTextSpan);

    // Action buttons (complete & delete)
    const iconsDiv = document.createElement("div");
    iconsDiv.className = "icons";

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click", () => toggleCompleteTask(taskItem));

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => deleteTask(taskItem));

    iconsDiv.appendChild(completeButton);
    iconsDiv.appendChild(deleteButton);

    taskItem.appendChild(iconsDiv);

    return taskItem;
}

// Toggle task completion
function toggleCompleteTask(taskItem) {
    const taskText = taskItem.querySelector("span").textContent;
    taskItem.classList.toggle("complete");

    // Update LocalStorage
    toggleTaskCompletionInLocalStorage(taskText);
}

// Delete a task
function deleteTask(taskItem) {
    const taskText = taskItem.querySelector("span").textContent;

    // Remove from the DOM
    taskItem.remove();

    // Remove from LocalStorage
    removeTaskFromLocalStorage(taskText);
}

// Save task to LocalStorage
function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, complete: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from LocalStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle task completion in LocalStorage
function toggleTaskCompletionInLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.text === taskText);

    if (task) {
        task.complete = !task.complete;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from LocalStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks from LocalStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.text, task.complete);
        taskList.appendChild(taskItem);
    });
}
