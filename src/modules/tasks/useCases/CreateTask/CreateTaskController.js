import { validateSchema } from "../../../../../data-guard/index.js";
import { AppError } from "../../../../errors/app-error.js";
import { buildResponse } from "../../../../utils/build-response.js";
import { CreateTaskUseCase } from "./CreateTaskUseCase.js";

const schema = {
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
};

export class CreateTaskController {
  handle(req, res) {  
    const { title, description } = req.body;
    
    const validationResult = validateSchema(schema, {title, description});

    if(!validationResult.success) {
      throw new AppError("Invalid fields", 400, validationResult.formattedError);
    }

    const createTaskUseCase = new CreateTaskUseCase();

    const data = createTaskUseCase.execute(req.body);

    return buildResponse(res, { status: 201, data });
  }
}
