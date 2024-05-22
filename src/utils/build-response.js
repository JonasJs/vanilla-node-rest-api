export function buildResponse(
  response,
  {
    data,
    errors,
    message,
    statusCode = 200,
    status,
    contentType = "application/json",
  }) {
  response.writeHead(statusCode, { "Content-Type": contentType });
  
  response.write(JSON.stringify({
    status,
    data,
    message,
    errors
  }));
  response.end();
}