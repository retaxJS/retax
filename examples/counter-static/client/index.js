import { retax } from '../../../lib/index';

import getRetaxConfig from '../common/retax.config';

const rootElement = document.getElementById('root');

retax.config(getRetaxConfig(false)); // we get the client configuration
retax.bootstrap(rootElement);
