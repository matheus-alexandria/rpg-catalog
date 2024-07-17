export class BadRequestError extends Error {
  status = 400;

  constructor(message = 'Something went wrong while processing the data.') {
    super(message);
  }
}
