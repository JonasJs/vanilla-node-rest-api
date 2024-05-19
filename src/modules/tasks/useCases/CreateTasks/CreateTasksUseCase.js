import { Tasks } from "../../entities/Tasks.js";
import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class CreateTasksUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }
  
  execute(data) {
    const task = new Tasks(data.title, data.description);

    this.#taskRepository.createTask(task);
    
    return task;
  }
}