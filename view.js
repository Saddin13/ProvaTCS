export default class TaskView {
  constructor() {
    this.taskForm = document.getElementById('task-form');
    this.taskInput = document.getElementById('task-input');
    this.taskList = document.getElementById('task-list');
    this.emptyState = document.getElementById('empty-state');
    this.feedback = document.getElementById('feedback');
  }

  render(tasks) {
    const hasTasks = tasks.length > 0;
    this.taskList.innerHTML = tasks
      .map((task) => this._createTaskHtml(task))
      .join('');

    this.emptyState.hidden = hasTasks;
    this.feedback.textContent = '';
  }

  _createTaskHtml(task) {
    return `
      <li class="task-item${task.completed ? ' completed' : ''}" data-id="${task.id}">
        <label>
          <input class="task-checkbox" type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} />
          <span class="sr-only">Concluída</span>
        </label>

        <p class="task-title">${this._escapeHtml(task.title)}</p>

        <div class="task-controls">
          <button type="button" class="edit-task" data-id="${task.id}">Editar</button>
          <button type="button" class="delete-task" data-id="${task.id}">Excluir</button>
        </div>
      </li>
    `;
  }

  _escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  bindAddTask(handler) {
    this.taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = this.taskInput.value.trim();
      if (!title) {
        this.showMessage('Digite um título válido para a tarefa.');
        return;
      }

      handler(title);
      this.taskInput.value = '';
      this.taskInput.focus();
    });
  }

  bindToggleTask(handler) {
    this.taskList.addEventListener('change', (event) => {
      const checkbox = event.target.closest('.task-checkbox');
      if (!checkbox) return;
      handler(checkbox.dataset.id);
    });
  }

  bindDeleteTask(handler) {
    this.taskList.addEventListener('click', (event) => {
      const button = event.target.closest('.delete-task');
      if (!button) return;
      handler(button.dataset.id);
    });
  }

  bindEditTask(handler) {
    this.taskList.addEventListener('click', (event) => {
      const button = event.target.closest('.edit-task');
      if (!button) return;

      const listItem = button.closest('.task-item');
      const taskId = button.dataset.id;
      const titleElement = listItem.querySelector('.task-title');
      const currentTitle = titleElement.textContent.trim();
      const newTitle = window.prompt('Editar tarefa:', currentTitle);
      if (newTitle === null) return;

      handler(taskId, newTitle);
    });
  }

  showMessage(message) {
    this.feedback.textContent = message;
  }
}
