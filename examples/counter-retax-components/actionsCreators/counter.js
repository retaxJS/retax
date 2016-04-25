import { actionsCreatorFactory } from 'retax';
import { AbstractActionsCreator, annotator } from 'retax-components';

@annotator.ActionsCreator()
export default class CounterActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  incrementActionCreator = actionsCreatorFactory('INC');
}
