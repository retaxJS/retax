declare module 'hoist-non-react-statics' {
  import * as React from 'react';

  export default function hoistNonReactStatic(
    Source: React.ComponentClass<any>|any,
    Target: React.ComponentClass<any>
  );
}
