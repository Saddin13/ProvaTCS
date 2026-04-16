export default class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddTask(this.handleAddTask.bind(this));
    this.view.bindToggleTask(this.handleToggleTask.bind(this));
    this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
    this.view.bindEditTask(this.handleEditTask.bind(this));

    this._refreshView();
  }

  _refreshView() {
    const tasks = this.model.getAllTasks();
    this.view.render(tasks);
  }

  handleAddTask(title) {
    this.model.createTask(title);
    this._refreshView();
    this.view.showMessage('Tarefa adicionada com sucesso.');
  }

  handleToggleTask(id) {
    this.model.toggleTaskCompletion(id);
    this._refreshView();
  }

  handleDeleteTask(id) {
    const removed = this.model.deleteTask(id);
    if (removed) {
      this._refreshView();
      this.view.showMessage('Tarefa removida.');
    }
  }

  handleEditTask(id, newTitle) {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      this.view.showMessage('O título da tarefa não pode ficar vazio.');
      return;
    }

    const updated = this.model.updateTask(id, trimmedTitle);
    if (updated) {
      this._refreshView();
      this.view.showMessage('Tarefa atualizada.');
    }
  }
}
