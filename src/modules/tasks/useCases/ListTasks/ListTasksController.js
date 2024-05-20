
import { ListTasksUseCase } from "./ListTasksUseCase.js";
import { validateSchema } from "../../../../../data-guard/index.js";

const schema = {
  title: "string",
  description: "string"
};

export class ListTasksController {
  handle(req, res) {
    const { title, description } = req.query;

    const listTasksUseCase = new ListTasksUseCase();

    const validationResult = validateSchema(schema, {title, description});

    if(!validationResult.success) {
      return res.writeHead(400).end(JSON.stringify(validationResult.errors));
    }

    const data = listTasksUseCase.execute(validationResult.data);

    return res.writeHead(200).end(JSON.stringify(data));
  }
}