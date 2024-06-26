import { AppError } from "../../../../errors/app-error.js";
import { getBrazilianTimestamp } from "../../../../utils/get-brazilian-timestamp.js";
import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class UpdateTaskUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }

  execute(id, data) {
    const taskAlreadyExist = this.#taskRepository.findById(id);
    if(!taskAlreadyExist) {
      throw new AppError("Tasks not found", 404);
    }

    const dataToUpdated = {
      ...data,
      updated_at: getBrazilianTimestamp()
    }
    const taskUpdated = this.#taskRepository.updateById(id, dataToUpdated);

    return taskUpdated;
  }
}