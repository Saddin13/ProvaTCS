import TaskModel from './model.js';
import TaskView from './view.js';
import TaskController from './controller.js';

const model = new TaskModel();
const view = new TaskView();
new TaskController(model, view);
