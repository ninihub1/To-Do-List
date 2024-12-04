// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add Task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  taskInput.value = ''; // Clear input
  saveTasks(); // Save tasks after adding a new one
});

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('click', () => {
    toggleTaskComplete(li);
    saveTasks(); // Save tasks after toggling completion
  });

  const span = document.createElement('span');
  span.textContent = taskText;

  const editButton = document.createElement('button');
  editButton.textContent = '✏️';
  editButton.className = 'edit-button';
  editButton.addEventListener('click', () => {
    editTask(span);
    saveTasks(); // Save tasks after editing
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveTasks(); // Save tasks after deleting
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}

function editTask(span) {
  const newText = prompt('Edit your task:', span.textContent);
  if (newText !== null) {
    span.textContent = newText;
  }
}

function toggleTaskComplete(task) {
  task.classList.toggle('complete');
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task').forEach(task => {
    tasks.push({
      text: task.querySelector('span').textContent,
      completed: task.classList.contains('complete')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  savedTasks.forEach(task => {
    const taskItem = createTaskElement(task.text);
    if (task.completed) {
      taskItem.classList.add('complete');
      taskItem.querySelector('.task-checkbox').checked = true;
    }
    taskList.appendChild(taskItem);
  });
}

// Call loadTasks when the page loads
window.onload = loadTasks;