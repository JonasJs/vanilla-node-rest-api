import { buildResponse } from "../../../../utils/build-response.js";
import { CompleteTaskUseCase } from "./CompleteTaskUseCase.js";

export class CompleteTaskController {
  handle(req, res) {
    const { id } = req.params;
    const completeTaskUseCase = new CompleteTaskUseCase();

    const data = completeTaskUseCase.execute(id);
    
    return buildResponse(res, { statusCode: 200, data })
  }
}