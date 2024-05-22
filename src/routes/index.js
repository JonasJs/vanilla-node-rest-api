import { CreateTaskController } from "../modules/tasks/useCases/CreateTask/CreateTaskController.js";
import { Router } from "./router.js";
import { ListTasksController } from "../modules/tasks/useCases/ListTasks/ListTasksController.js";
import { UpdateTaskController } from "../modules/tasks/useCases/UpdateTask/UpdateTaskController.js";

// Controllers
const createTaskController = new CreateTaskController();
const listTasksController = new ListTasksController();
const updateTaskController = new UpdateTaskController();

// Router
const router = new Router();

router.post("/tasks", createTaskController.handle);
router.get("/tasks", listTasksController.handle);
router.put("/tasks/:id", updateTaskController.handle);

const routes = router?.routes;

export { routes };