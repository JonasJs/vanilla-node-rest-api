
import { ListTasksUseCase } from "./ListTasksUseCase.js";
import { validateSchema } from "../../../../../data-guard/index.js";
import { buildResponse } from "../../../../utils/build-response.js";
import { AppError } from "../../../../errors/app-error.js";

const schema = {
  title: "string",
  description: "string"
};

export class ListTasksController {
  handle(req, res) {
    const { title, description } = req.query;
    const validationResult = validateSchema(schema, {title, description});
    
    if(!validationResult.success) {
      throw new AppError("Invalid fields", 400, ionResult.formattedError);
    }
    
    const listTasksUseCase = new ListTasksUseCase();
    const data = listTasksUseCase.execute(validationResult.data);

    return buildResponse(res, { data });
  }
}