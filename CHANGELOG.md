#1.1.1
Update the way retax export its constants.

#1.1.0
Update **retax-*** dependencies to follow semver.


#1.1.0-alpha
* **retax-core** no longer depend on **webpack-isomorphic-tools**
* You can now use your own template when using **retax-server**

If you are using server rendering, you could do that by adding a property in the middleware configuration:

```js
app.use(retaxMiddleware({
  serverRendering: true,
  dynamicIndex: genHtmlIndex(isomorphicTools.assets()),
  retaxConfig: getRetaxConfig(true), // we retrieve the server config
}));
```

`dynamicIndex` should be a function that takes 2 arguments:
  * the app (JSX) computed by retax
  * the redux store
and returns the final JSX.


If you are not using server rendering, you should do

```js
app.use(retaxMiddleware({
  serverRendering: false,
  staticIndex: genHtmlIndex(isomorphicTools.assets()),
  retaxConfig: getRetaxConfig(true), // we retrieve the server config
}));
```

`dynamicIndex` should be a function that returns a string (the HTML markup)

See the `examples` for more explanations.

#1.0.0-alpha
* Initial version
