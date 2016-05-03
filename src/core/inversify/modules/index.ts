/**
 * These are useful DI module that works great with retax-client and retax-server.
 * You DON'T HAVE to use them. You could just create your own modules in your project using retax.
 * It is highly recommended to use them with retax-client and retax-server
 */

export { default as commonModule, contextModuleFactory, lifecycleModuleFactory } from './common';
export { default as clientModule } from './client';
export { default as serverModule } from './server';
