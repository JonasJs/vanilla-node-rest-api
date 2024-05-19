import database from "../../../database/index.js";

export class TaskReposistory {
  #table = "tasks";

  createTask(data) {
    database.insert(data);

    return data;
  }

  createTask(data) {
    database.insert(this.#table, data);

    return data;
  }

  listTasks({ filter } = {}) {
    const tasks = database.select(this.#table, { filter });

    return tasks;
  }
};