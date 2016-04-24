import { Kernel } from 'inversify';
import { diModule } from 'retax-di';

const kernel = new Kernel();
kernel.load(diModule);

export default kernel;
