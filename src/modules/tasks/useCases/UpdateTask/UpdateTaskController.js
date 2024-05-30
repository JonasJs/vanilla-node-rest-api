import { buildResponse } from "../../../../utils/build-response.js";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase.js";
import { validateSchema } from "../../../../../data-guard/index.js";
import { AppError } from "../../../../errors/app-error.js";

const schema = {
  title: "string",
  description: "string"
};

export class UpdateTaskController {
  handle(req, res) {
    const { id } = req.params;
    
    const validationResult = validateSchema(schema, req.body);
    
    if(!validationResult.success) {
      throw new AppError("Invalid fields", 400, validationResult.formattedError);
    }

    const updateTaskUseCase = new UpdateTaskUseCase();

    const data = updateTaskUseCase.execute(id, validationResult.data);
    
    return buildResponse(res, { data })
  }
}