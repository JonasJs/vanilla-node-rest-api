import { AppError } from "../../../../errors/app-error.js";
import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class UpdateTaskUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }

  execute(data) {
    const taskAlreadyExist = this.#taskRepository.findById(data.id);
    if(!taskAlreadyExist) {
      throw new AppError("Tasks not found", 404);
    }

    return data;
  }
}