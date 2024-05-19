export function buildRoutePath(path) {

  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

  const queryParametersGroupRegex = '(?<query>\\?(.*))';
  const pathRegex = new RegExp(`^${pathWithParams}${queryParametersGroupRegex}?$`);

  return pathRegex;
}