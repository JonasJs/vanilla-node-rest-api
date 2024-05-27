import http from "node:http";
import "./database/index.js";

import { routes } from "./routes/index.js";
import { buildBody } from "./middlewares/build-body.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
import { AppError } from "./errors/app-error.js";
import { buildResponse } from "./utils/build-response.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await buildBody(request, response);

  const route = routes.find(route => route.method === method && route.path.test(url));

  if(route) {
    const routeParams = request.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = extractQueryParams(query);
    try {
      return route.handle(request, response);
    } catch (error) {

      if (error instanceof AppError) {
        return buildResponse(response, {
          statusCode: error.statusCode,
          status: "error",
          message: error.message,
          errors: error.data
        })
      }

      console.log("Internal Error => ", error.message)
      return buildResponse(response, {
        statusCode: 500,
        status: "error",
        message: `Internal server error`
      });
    }
  }

  return response.writeHead(404).end();
});

server.listen(3333);
