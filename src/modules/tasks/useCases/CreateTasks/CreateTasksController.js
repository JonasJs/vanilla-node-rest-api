import { CreateTasksUseCase } from "./CreateTasksUseCase.js";

export class CreateTasksController {
  handle(req, res) {
    
    const createTasksUseCase = new CreateTasksUseCase();

    const data = createTasksUseCase.execute(req.body);

    return res.writeHead(201).end(JSON.stringify(data));
  }
}