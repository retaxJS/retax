import { INITIAL_STATE_KEY } from 'retax';

export default function genStaticIndex(assets) {
  return () => (`
    <!DOCTYPE html>
    <html>
      <head>
        <title>RetaxTest</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body class="fullbleed layout vertical">
        <div id="root" class="flex layout vertical">
          Loading...
        </div>
        <script>
          window.${INITIAL_STATE_KEY} = ${JSON.stringify({})};
        </script>
        ${
          Object.keys(assets.javascript).map((scriptName) => (
            `<script src="${assets.javascript[scriptName]}" defer></script>`
          )).join('')
        }
      </body>
    </html>
  `);
}
