import * as React from 'react';

import { IRetaxChildContext } from './interfaces';

import { InversifyKernelFacade } from '../../inversifyKernelFacade';

abstract class RetaxConsumer<P, S> extends React.Component<P, S> {
  public static contextTypes: React.ValidationMap<any> = {
    kernel: React.PropTypes.instanceOf(InversifyKernelFacade),
  };

  public context: IRetaxChildContext;
}

export default RetaxConsumer;
