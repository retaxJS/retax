export interface IInitializable<I, O> {
  initialize(param?: I): O;
}

export interface IAsyncInitializable<I, O> {
  initialize(param?: I): Promise<O>;
}
