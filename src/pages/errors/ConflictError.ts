export class ConflictError extends Error {
  status = 409;

  constructor(message = 'This action conflict with the state of the server.') {
    super(message);
  }
}
