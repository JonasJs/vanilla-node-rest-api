import http from "node:http";
import "./database/index.js";

import { routes } from "./routes/index.js";
import { buildBody } from "./middlewares/build-body.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await buildBody(request, response);

  const route = routes.find(route => route.method === method && route.path.test(url));

  if(route) {
    const routeParams = request.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = extractQueryParams(query);

    return route.handle(request, response);
  }

  return response.writeHead(404).end();
});

server.listen(3333);
