import { actionsCreatorFactory, AbstractActionsCreator, annotator } from '../../../lib/index';

@annotator.ActionsCreator()
export default class CounterActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  incrementActionCreator = actionsCreatorFactory('INC');
}
