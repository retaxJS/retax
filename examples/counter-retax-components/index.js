import { retax } from 'retax';

import retaxConfig from './retax.config';

const rootElement = document.getElementById('root');

retax.config(retaxConfig);
retax.bootstrap(rootElement);
