import * as React from 'react';

import { IRetaxProps, IRetaxChildContext } from './interfaces';

import { InversifyKernelFacade } from '../../inversifyKernelFacade';

export default class RetaxProvider extends React.Component<IRetaxProps, void> {
  public static propTypes: React.ValidationMap<any> = {
    kernel: React.PropTypes.instanceOf(InversifyKernelFacade).isRequired,
  };

  public static childContextTypes: React.ValidationMap<any> = {
    kernel: React.PropTypes.instanceOf(InversifyKernelFacade),
  };

  public getChildContext(): IRetaxChildContext {
    return {
      kernel: this.props.kernel,
    };
  }

  public render(): any {
    return React.Children.only(this.props.children);
  }
}
