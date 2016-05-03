# retax examples

## Getting started

Install retax dependencies
```
git clone https://github.com/retaxJS/retax
cd retax
npm install
```

Try an example
```
cd examples/counter
npm install
node server.js
```

## counter
A simple counter very similar to the redux counter example.

Be sure to check `./counter/index.js` and `./counter/retax.config.js` to see the power of **retax**!

## counter-static
Same counter than the previous example.

The only difference is that we are using the static rendering middleware from **retax-server**.

Be sure to check `./counter-static/server/server.js`.

## universal
A simple counter very similar to the redux counter example but with server rendering.
The code in the folder `./universal/common` is exactly the code of the **counter** example.

Be sure to check `./universal/client` and `./universal/server` to see how retax works with server rendering.

## counter-retax-components
This one is **EXPERIMENTAL**. It shows the packages `retax-components` and the **retax** dependency injection system.

I am not happy with the current syntax of actions creators and retax components. It may change in a near future.
Suggestion are welcome!

