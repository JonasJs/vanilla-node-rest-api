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

  listTasks(filter) {
    return database.select(this.#table, filter);
  }

  findById(id) {
    return database.findById(this.#table, id);
  }

  updateById(id, data) {
    return database.updateById(this.#table, id, data);
  }

  deleteById(id) {
    return database.deleteById(this.#table, id);
  }
};