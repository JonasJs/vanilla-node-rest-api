import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class ListTasksUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }

  execute({ filter } = {}) {
    const filterEntries = Object.entries(filter).filter(([_, value]) => typeof value === 'string');
    
    const filterData = Object.fromEntries(filterEntries);

    const data = this.#taskRepository.listTasks({ filter: filterData });

    return data;
  }
}