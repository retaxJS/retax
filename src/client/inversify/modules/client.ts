import { IKernel } from 'inversify';

import {
  IClientBootstrapper, ClientBootstrapper,
} from '../../bootstrap';

import {
  CLIENT_BOOTSTRAPPER,
} from '../identifiers';

export default function clientModule(kernel: IKernel): void {
  kernel.bind<IClientBootstrapper>(CLIENT_BOOTSTRAPPER).to(ClientBootstrapper);
}
