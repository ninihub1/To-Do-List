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
});

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('click', () => toggleTaskComplete(li));

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => li.remove());

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
}

function toggleTaskComplete(task) {
  task.classList.toggle('complete');
}

