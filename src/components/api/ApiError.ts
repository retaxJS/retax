import { IHttpError, IHttpErrorConstructor } from './interfaces';

export default class ApiError extends Error implements IHttpError {
  public status: number;
  public statusText: string;
  public responseText: string;

  constructor({
    status,
    statusText,
    text,
  }: IHttpErrorConstructor) {
    super(statusText);

    this.status = status;
    this.statusText = statusText;
    this.responseText = text;
  }
}
