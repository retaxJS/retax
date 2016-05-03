import { IAction, IActionCreator, IPayloadCreator, IMetaCreator } from './interfaces';

function id<T>(x: T): T {
  return x;
}

export default function makeActionsCreator<P, M>(
  type: string,
  payloadCreator?: P|IPayloadCreator<P>,
  metaCreator?: IMetaCreator<M>
): IActionCreator<P, M> {
  const finalPayloadCreator: IPayloadCreator<P> = payloadCreator instanceof Function ? payloadCreator : id;

  return function(...args: any[]): IAction<P, M> {
    let action: IAction<P, M> = {
      payload: finalPayloadCreator(...args),
      type,
    };

    if (metaCreator && metaCreator instanceof Function) {
      action.meta = metaCreator(...args);
    }

    if (args.length === 1 && args[0] instanceof Error) {
      action.error = true;
    }

    return action;
  };
}
