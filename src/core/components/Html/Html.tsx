import * as React from 'react';
import * as Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';

import { IHtmlProps } from './interfaces';

export default class Html extends React.Component<IHtmlProps, void> {
  public render(): JSX.Element {
    const { store, rootComponent, assets, internalConfig } = this.props;
    const content = renderToString(rootComponent);

    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />

          {head && head.title.toComponent()}
          {head && head.meta.toComponent()}
          {head && head.link.toComponent()}

          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </head>
        <body className="fullbleed layout vertical">
          <div
            id="root"
            className="flex layout vertical"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <script
            id="initial-state"
            dangerouslySetInnerHTML={{
              __html: `
                window.${internalConfig.INITIAL_STATE_KEY}=${JSON.stringify(store.getState())};
              `,
            }}
            charSet="UTF-8"
          />
          {Object.keys(assets.javascript).map(script =>
            <script src={assets.javascript[script]} key={script} defer />
          )}
        </body>
      </html>
    );
  }
}
