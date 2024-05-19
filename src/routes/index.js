import { CreateTasksController } from "../modules/tasks/useCases/CreateTasks/CreateTasksController.js";
import { Router } from "./router.js";
import { ListTasksController } from "../modules/tasks/useCases/ListTasks/ListTasksController.js";

// Controllers
const createTasksController = new CreateTasksController();
const listTasksController = new ListTasksController();

// Router
const router = new Router();

router.post("/tasks", createTasksController.handle);
router.get("/tasks", listTasksController.handle);

const routes = router?.routes;

export { routes };