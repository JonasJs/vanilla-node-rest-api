import { CreateTasksController } from "../modules/tasks/useCases/CreateTasks/CreateTasksController.js";
import { Router } from "./router.js";
import database from "../database/index.js";

// Controllers
const createTasksController = new CreateTasksController();

// Router
const router = new Router();

router.post("/tasks", createTasksController.handle);
router.get("/tasks", (req, res) => {
  const data = database.select({table: "tasks"})

  res.end(JSON.stringify(data));
});

const routes = router?.routes;

export { routes };