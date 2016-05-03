import { RequestHandler } from 'express';

export interface IRetaxMiddleware extends RequestHandler {}

export interface IRetaxMiddlewareFactory {
  create(): IRetaxMiddleware;
}
