import database from "../../../database/index.js";

export class TaskReposistory {
  #table = "tasks";

  createTask(data) {
    database.insert(data);

    return data;
  }

  createTask(data) {
    database.insert({
      table: this.#table,
      data
    });

    return data;
  }
};