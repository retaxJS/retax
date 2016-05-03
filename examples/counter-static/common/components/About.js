import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div>
    Hello About!
    <Link to="/counter"><button>Go to /counter</button></Link>
  </div>
);
