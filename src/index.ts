import { InternalConfigStore } from 'retax-core';

const internalConfigStore = new InternalConfigStore();

export { default as retaxKernel } from './di';
export { default as retax } from './client';
export { default as retaxMiddleware } from './server';

export { actionsCreatorFactory, reducerFactory } from 'retax-utils';
export { setAuthToken, removeAuthToken } from 'retax-core';
export const INITIAL_STATE_KEY = internalConfigStore.config.INITIAL_STATE_KEY;
export const COOKIE_AUTH_TOKEN_KEY = internalConfigStore.config.COOKIE_AUTH_TOKEN_KEY;
