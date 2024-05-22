import { Task } from "../../entities/Task.js";
import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class CreateTaskUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }
  
  execute(data) {
    const task = new Task(data.title, data.description);

    this.#taskRepository.createTask(task);
    
    return task;
  }
}