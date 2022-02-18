export default function Html({ assets, children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={assets["style.css"]} />
        <title>{title}</title>
      </head>
      <body>
        <div id="modal"></div>
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`,
          }}
        />
      </body>
    </html>
  );
}
