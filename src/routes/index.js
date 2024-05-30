import { CreateTaskController } from "../modules/tasks/useCases/CreateTask/CreateTaskController.js";
import { Router } from "./router.js";
import { ListTasksController } from "../modules/tasks/useCases/ListTasks/ListTasksController.js";
import { UpdateTaskController } from "../modules/tasks/useCases/UpdateTask/UpdateTaskController.js";
import { DeleteTaskController } from "../modules/tasks/useCases/DeleteTask/DeleteTaskController.js";
import { CompleteTaskController } from "../modules/tasks/useCases/CompleteTask/CompleteTaskController.js";

// Controllers
const createTaskController = new CreateTaskController();
const listTasksController = new ListTasksController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();
const completeTaskController = new CompleteTaskController();

// Router
const router = new Router();

router.post("/tasks", createTaskController.handle);
router.get("/tasks", listTasksController.handle);
router.put("/tasks/:id", updateTaskController.handle);
router.delete("/tasks/:id", deleteTaskController.handle);
router.patch("/tasks/:id/complete", completeTaskController.handle);

const routes = router?.routes;

export { routes };