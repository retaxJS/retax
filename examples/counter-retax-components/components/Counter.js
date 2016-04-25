import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { annotator } from 'retax-components';

import CounterActionsCreator from '../actionsCreators/counter';

@annotator.RetaxComponent({
  actionsCreators: {
    counterActions: CounterActionsCreator,
  },
})
@connect(
  ({ counter }) => ({ counter }),
  (dispatch, { counterActions }) => bindActionCreators({
    incrementActionCreator: counterActions.incrementActionCreator,
  }, dispatch)
)
export default class CounterPage extends React.Component {
  render() {
    const { counter, incrementActionCreator } = this.props;

    return (
      <div>
        Hello Counter! Here is the counter value: {counter}
        <button onClick={incrementActionCreator}>+</button>
        <Link to="/about"><button>Go to /about</button></Link>
      </div>
    );
  }
}
