import { IKernel } from 'inversify';

import { AbstractActionsCreator } from '../../actionsCreator';
import { IAnnotator, Annotator } from '../../annotator';
import { AbstractApi } from '../../api';
import { IEnhancer, Enhancer } from '../../enhancer';
import { AbstractLifecycleManager } from '../../lifecycle';

import {
  ACTIONS_CREATOR_CONSTRUCTOR,
  ANNOTATOR,
  API_CONSTRUCTOR,
  ENHANCER,
  LIFECYCLE_MANAGER_CONSTRUCTOR,
} from '../identifiers';

export default function componentsModule(kernel: IKernel): void {
  kernel.bind<IAnnotator>(ANNOTATOR).to(Annotator);
  kernel.bind<IEnhancer>(ENHANCER).to(Enhancer);

  kernel.bind<typeof AbstractApi>(API_CONSTRUCTOR).toConstantValue(AbstractApi);
  kernel.bind<typeof AbstractActionsCreator>(ACTIONS_CREATOR_CONSTRUCTOR).toConstantValue(AbstractActionsCreator);
  kernel.bind<typeof AbstractLifecycleManager>(LIFECYCLE_MANAGER_CONSTRUCTOR).toConstantValue(AbstractLifecycleManager);
}
