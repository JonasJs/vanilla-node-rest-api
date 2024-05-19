
import { ListTasksUseCase } from "./ListTasksUseCase.js";

export class ListTasksController {

  handle(req, res) {
    const { title, description } = req.query;

    const listTasksUseCase = new ListTasksUseCase();

    const data = listTasksUseCase.execute({
      filter: {
        title,
        description
      }
    })

    return res.writeHead(200).end(JSON.stringify(data));
  }
}