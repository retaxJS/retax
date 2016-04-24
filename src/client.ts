import kernel from './di';
import {
  clientModule,
  CLIENT_BOOTSTRAPPER,
  IClientBootstrapper,
} from 'retax-client';

kernel.load(clientModule);

export default kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);
