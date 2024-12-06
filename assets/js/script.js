const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const highPriorityList = document.getElementById('highPriorityList');
const completedTaskList = document.getElementById('completedTaskList');
const priorityButtons = document.querySelectorAll('.priority-btn');

let selectedTask = null;

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText, priority);
  if (priority === 'high') {
    highPriorityList.appendChild(taskItem);
  } else {
    taskList.appendChild(taskItem);
  }

  taskInput.value = '';
  saveTasks();
});

priorityButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (selectedTask) {
      const newPriority = button.getAttribute('data-priority');
      updateTaskPriority(selectedTask, newPriority);
      saveTasks();
    } else {
      alert('Please select a task to change its priority.');
    }
  });
});

function createTaskElement(taskText, priority) {
  const li = document.createElement('li');
  li.className = `task priority-${priority}`;

  // Checkbox for marking task as complete
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('click', () => {
    toggleTaskComplete(li);
    saveTasks();
  });

  const span = document.createElement('span');
  span.textContent = taskText;

  li.addEventListener('click', () => {
    if (selectedTask) {
      selectedTask.classList.remove('selected');
    }
    selectedTask = li;
    li.classList.add('selected');
  });

  const editButton = document.createElement('button');
  editButton.textContent = '✏️';
  editButton.className = 'edit-button';
  editButton.addEventListener('click', () => {
    editTask(span);
    saveTasks();
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => {
    li.remove();
    if (li === selectedTask) selectedTask = null;
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}

function updateTaskPriority(task, newPriority) {
  task.className = `task priority-${newPriority}`;
  if (newPriority === 'high') {
    highPriorityList.appendChild(task);
  } else {
    taskList.appendChild(task);
  }
}

function toggleTaskComplete(task) {
  if (task.classList.contains('complete')) {
    task.classList.remove('complete');
    const priority = task.className.split(' ')[1].split('-')[1];
    if (priority === 'high') {
      highPriorityList.appendChild(task);
    } else {
      taskList.appendChild(task);
    }
  } else {
    task.classList.add('complete');
    task.remove();
    completedTaskList.appendChild(task);
    if (task === selectedTask) selectedTask = null;
  }
}

function editTask(span) {
  const newText = prompt('Edit your task:', span.textContent);
  if (newText !== null) {
    span.textContent = newText;
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task').forEach(task => {
    tasks.push({
      text: task.querySelector('span').textContent,
      completed: task.classList.contains('complete'),
      priority: task.className.split(' ')[1].split('-')[1],
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  savedTasks.forEach(task => {
    const taskItem = createTaskElement(task.text, task.priority);
    if (task.completed) {
      taskItem.classList.add('complete');
      taskItem.querySelector('.task-checkbox').checked = true;
      completedTaskList.appendChild(taskItem);
    } else {
      if (task.priority === 'high') {
        highPriorityList.appendChild(taskItem);
      } else {
        taskList.appendChild(taskItem);
      }
    }
  });
}

window.onload = loadTasks;
