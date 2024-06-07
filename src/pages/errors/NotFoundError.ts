export class NotFoundError extends Error {
  constructor(message = 'Entities not found.') {
    super(message);
  }
}
