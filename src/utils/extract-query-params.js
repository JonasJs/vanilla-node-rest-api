export function extractQueryParams(query) {
  if(typeof query !== 'string') {
    return {};
  }

  return query.substring(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=');
    queryParams[key] = value;

    return queryParams;
  }, {});
}