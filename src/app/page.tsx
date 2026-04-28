// Static-export root page. GitHub Pages serves /index.html with no server-side
// redirect support, so we emit a real HTML document that bounces visitors to
// the right locale via a meta refresh fallback and a quick JavaScript hop that
// detects the browser language.
export default function RootPage() {
  const script = `(function(){var l=(navigator.language||"en").toLowerCase();window.location.replace("/"+(l.indexOf("zh")===0?"zh":"en")+"/");})();`;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="/en/" />
        <title>Tiancheng LIU</title>
      </head>
      <body
        style={{
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          margin: 0,
          padding: "4rem 1.5rem",
          textAlign: "center",
          color: "#444",
        }}
      >
        <p>
          Redirecting to <a href="/en/">English</a> · <a href="/zh/">中文</a>
        </p>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}
