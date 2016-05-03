import { IHashMap } from '../../../utils';

export interface IOperatorCondition {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  eq?: number;
  neq?: number;
}

export interface IWhereCondition extends IHashMap<string|number|string[]|IOperatorCondition> {}

export interface IOrCondition {
  or?: IWhereCondition[];
}

export interface IAndCondition {
  and?: IWhereCondition[];
}

export interface INotCondition {
  not?: IWhereCondition;
}

export interface IWhereFilter extends IOrCondition, IAndCondition, INotCondition, Array<IWhereCondition> {}

export interface IRestFilter {
  offset: number;
  limit: number;
  sort: string[];
  where: IWhereFilter[];
  options: string[];
};
