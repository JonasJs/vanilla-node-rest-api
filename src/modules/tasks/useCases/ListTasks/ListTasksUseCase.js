import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class ListTasksUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }

  execute(filter) {
    const filterData = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => typeof value === 'string')
    );

    const data = this.#taskRepository.listTasks(filterData);

    return data;
  }
}