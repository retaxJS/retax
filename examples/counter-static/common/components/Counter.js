import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { incrementActionCreator } from '../actionsCreators/counter';

export default connect(
  ({ counter }) => ({ counter }),
  dispatch => bindActionCreators({ incrementActionCreator }, dispatch)
)(
  ({ counter, incrementActionCreator }) => (
    <div>
      Hello Counter! Here is the counter value: {counter}
      <button onClick={incrementActionCreator}>+</button>
      <Link to="/about"><button>Go to /about</button></Link>
    </div>
  )
);
