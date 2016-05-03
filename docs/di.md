# Retax-Di

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This library allows you to create and mediate an IoC container (based on [inversify](http://inversify.io/)).
It also allows the user to register services into it (usefull if you want to register component into the container at runtime).

It is used by [retax-client][retax-client-link] and [retax-server][retax-server-link].

It depends on [retax-core][retax-core-link].

## How does it work?

The user can optionnaly register a service using the `injector`:

```ts
import { InversifyKernelFacade } from 'retax-core';
import { Injector, KernelMediator, KernelFactory } from 'retax-di';

class Incrementer {
  public value: number = 0;

  public increment(): number {
    return ++this.value;
  }
}

class Decrementer {
  public value: number = 0;

  public decrement(): number {
    return --this.value;
  }
}

// you could create a top-level IoC container if you don't want to do the following yourself
const inversifyKernelFacadeFactory = () => new InversifyKernelFacade();
const kernelFactory = new KernelFactory(inversifyKernelFacadeFactory);
const injector = new Injector();
const kernelMediator = new KernelMediator(kernelFactory, injector);

const incrementerId = injector.registerService(Incrementer);

const kernel = kernelMediator.create(/* optionnal kernel modules (see https://github.com/inversify/InversifyJS/#declaring-kernel-modules*/);

const incrementer = kernel.get(incrementerId);

assert(incrementer.value === 0);
assert(incrementer.increment() === 1);


// Later...


const decrementerId = injector.registerService(Decrementer);
kernelMediator.reload(kernel); // reload will autmatically reload user modules into the kernel

const decrementer = kernel.get(decrementerId);

assert(decrementer.value === 0);
assert(decrementer.increment() === -1);

```


## FAQ
### I don't understand how this library is built
Check [builder][builder-link] and [builder-ts-library][builder-ts-library-link]


## Typescript support
This project is shipped with typescript typings.
If you are using typescript@^1.6, you don't have to do anything, it will detect the definition types automatically.


##License
MIT License (MIT)

[gitter-badge]: https://badges.gitter.im/retaxJS/retax.svg
[gitter-link]: https://gitter.im/retaxJS/retax?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[travis-badge]: https://travis-ci.org/retaxJS/retax-di.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax-di
[version-badge]: https://badge.fury.io/js/retax-di.svg
[version-link]: https://badge.fury.io/js/retax-di
[codecov-badge]: https://codecov.io/github/retaxJS/retax-di/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax-di?branch=master
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library

[retax-client-link]: https://github.com/retaxJS/retax-client
[retax-server-link]: https://github.com/retaxJS/retax-server
[retax-core-link]: https://github.com/retaxJS/retax-core
