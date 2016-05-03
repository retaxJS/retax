import { IImmutableState } from './StateProxy';

export interface IStateConverter {
  convertStateToImmutable<S extends IImmutableState>(object: Object, nonImmutableKeys: string[]): S;
}
