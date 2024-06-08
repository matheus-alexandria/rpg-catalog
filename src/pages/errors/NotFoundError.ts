export class NotFoundError extends Error {
  status = 404;
  constructor(message = 'Entities not found.') {
    super(message);
  }
}
