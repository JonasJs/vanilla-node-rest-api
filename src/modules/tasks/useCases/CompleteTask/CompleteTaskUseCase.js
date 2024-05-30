import { AppError } from "../../../../errors/app-error.js";
import { getBrazilianTimestamp } from "../../../../utils/get-brazilian-timestamp.js";
import { TaskReposistory } from "../../repositories/TaskRepository.js";

export class CompleteTaskUseCase {
  #taskRepository;

  constructor() {
    this.#taskRepository = new TaskReposistory();
  }
  
  execute(id) {
    const taskAlreadyExist = this.#taskRepository.findById(id);
    if(!taskAlreadyExist) {
      throw new AppError("Tasks not found", 404);
    }

    const completed_at = taskAlreadyExist?.completed_at ? null : getBrazilianTimestamp();
    const updated_at = getBrazilianTimestamp();

    const taskUpdated = this.#taskRepository.updateById(id, { completed_at, updated_at });
    
    return taskUpdated
  }
}