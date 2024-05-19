import { buildRoutePath } from "../utils/build-route-path.js";

export class Router {
  routes = [];

  #buildRoute(path, method, handle) {
    this.routes.push({
      path: buildRoutePath(path),
      method,
      handle
    });
  }

  post(path, handle) {
    this.#buildRoute(path, "POST", handle);
  }

  get(path, handle) {
    this.#buildRoute(path, "GET", handle);
  }

  put(path, handle) {
    this.#buildRoute(path, "PUT", handle);
  }

  DELETE(path, handle) {
    this.#buildRoute(path, "DELETE", handle);
  }

  PATCH(path, handle) {
    this.#buildRoute(path, "PATCH", handle);
  }
}