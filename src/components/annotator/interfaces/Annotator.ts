import {
  IRetaxComponentRuntimeConfig,
  IApiServiceRuntimeConfig,
  IActionsCreatorServiceRuntimeConfig,
} from '../../../core';

export interface IAnnotator {
  action(): MethodDecorator;
  Api(config: IApiServiceRuntimeConfig): ClassDecorator;
  ActionsCreator(config: IActionsCreatorServiceRuntimeConfig): ClassDecorator;
  LifecycleManager(config: IActionsCreatorServiceRuntimeConfig): ClassDecorator;
  RetaxComponent(config: IRetaxComponentRuntimeConfig): ClassDecorator;
}
