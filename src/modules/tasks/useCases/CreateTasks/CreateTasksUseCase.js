import { TaskReposistory } from "../../repositories/TaskRepository.js";


export class CreateTasksUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }
  
  execute(data) {
    const task = this.#taskRepository .createTask(data);
    
    return task;
  }
}