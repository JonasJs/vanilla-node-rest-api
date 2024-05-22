import { buildResponse } from "../../../../utils/build-response.js";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase.js";

export class UpdateTaskController {
  handle(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const updateTaskUseCase = new UpdateTaskUseCase();

    const data = updateTaskUseCase.execute({
      id,
      title,
      description
    });
    
    return buildResponse(res, { data })
  }
}