import { fromJS } from 'immutable';

import { IStateConverter, IImmutableState } from './interfaces';

/**
 * Feature inheritance. Not realy good practice...
 */
abstract class AStateConverter implements IStateConverter {
  public convertStateToImmutable<S extends IImmutableState>(object: Object = {}, nonImmutableKeys: string[] = []): S {
    const immutableObject: S = Object.keys(object).reduce((res: S, cur: string) => {
      const newRes = res;
      const shouldConvert = !nonImmutableKeys.includes(cur);

      newRes[cur] = shouldConvert ? fromJS(object[cur]) : object[cur];

      return newRes;
    }, object as S);

    return immutableObject;
  }
}

export default AStateConverter;
