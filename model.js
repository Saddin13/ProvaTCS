const STORAGE_KEY = 'provaTCS-tasks';

export default class TaskModel {
  constructor(storageKey = STORAGE_KEY) {
    this.storageKey = storageKey;
    this.tasks = this._loadTasks();
  }

  _loadTasks() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Erro ao carregar tarefas:', error);
      return [];
    }
  }

  _saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  getAllTasks() {
    return [...this.tasks];
  }

  createTask(title) {
    const task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now()
    };

    this.tasks.unshift(task);
    this._saveTasks();
    return task;
  }

  updateTask(id, newTitle) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return null;
    task.title = newTitle.trim();
    this._saveTasks();
    return task;
  }

  toggleTaskCompletion(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return null;
    task.completed = !task.completed;
    this._saveTasks();
    return task;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    if (taskIndex === -1) return false;
    this.tasks.splice(taskIndex, 1);
    this._saveTasks();
    return true;
  }
}
