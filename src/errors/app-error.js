export class AppError {
  statusCode = 400;
  message = 'Internal server error ';
  data;

  constructor(message, statusCode = 400, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data
  }
}