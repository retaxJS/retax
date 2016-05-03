import { Store } from 'redux';

import { IInternalConfig } from '../../../configStores';
import { IAssets } from '../../../context';

export interface IHtmlProps {
  store: Store<any>;
  assets: IAssets;
  rootComponent: JSX.Element;
  internalConfig: IInternalConfig;
}
