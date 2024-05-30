import { AppError } from "../../../../errors/app-error.js";
import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class DeleteTaskUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }

  execute(id) {
    const taskAlreadyExist = this.#taskRepository.findById(id);
    if(!taskAlreadyExist) {
      throw new AppError("Tasks not found", 404);
    }

    this.#taskRepository.deleteById(id);
  }
}