/**
 * These are the identifiers used with DI.
 * If you are using retax core without retax client or retax server, you HAVE to use these identifiers
 * or the DI won't work.
 */

// components
export const HTML_COMPONENT = Symbol('HtmlComponent');
export const RETAX_PROVIDER_COMPONENT = Symbol('RetaxProviderComponent');
export const RETAX_CONSUMER_COMPONENT = Symbol('RetaxConsumerComponent');
export const COMPONENTS = { HTML_COMPONENT, RETAX_PROVIDER_COMPONENT, RETAX_CONSUMER_COMPONENT };

// config stores
export const INTERNAL_CONFIG_STORE = Symbol('InternalConfigStore');
export const RETAX_CONFIG_STORE = Symbol('RetaxConfigStore');
export const CONFIG_STORES = { INTERNAL_CONFIG_STORE, RETAX_CONFIG_STORE };

// cookie proxies
export const COOKIE_PROXY = Symbol('CookieProxy');

// inversify kernel facade
export const INVERSIFY_KERNEL_FACADE = Symbol('InversifyKernelFacade');

// jsx builders
export const JSX_BUILDER = Symbol('JSXBuilder');

// react router facade
export const REACT_ROUTER_FACADE = Symbol('ReactRouterFacade');

// redux facade
export const REDUX_FACADE = Symbol('ReduxFacade');

// state proxies
export const STATE_PROXY = Symbol('StateProxy');

// bootstrapping context
export const CONTEXT = Symbol('Context');

// mediator
export const MEDIATOR = Symbol('Mediator');

// lifecycle
export const LIFECYCLE_ACTIONS_CREATOR = Symbol('LifecycleActionsCreator');
