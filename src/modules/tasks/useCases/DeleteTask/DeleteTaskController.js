import { buildResponse } from "../../../../utils/build-response.js";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase.js";

export class DeleteTaskController {
  handle(req, res) {
    const { id } = req.params;
    const deleteTaskUseCase = new DeleteTaskUseCase();

    deleteTaskUseCase.execute(id);
    
    return buildResponse(res, { statusCode: 204 })
  }
}