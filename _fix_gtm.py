from pathlib import Path

root = Path(r'C:\Users\Chi Fung\chifungtech.github.io')

for p in root.glob('*.html'):
    text = p.read_text(encoding='utf-8')
    original = text
    text = text.replace(
        '<link rel="preconnect" href="https://www.googletagmanager.com" />\n  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />\n',
        ''
    )
    text = text.replace(
        '\n  <!-- Google tag (gtag.js) -->\n  <script defer src="https://www.googletagmanager.com/gtag/js?id=AW-18321476060"></script>',
        ''
    )
    text = text.replace(
        '\n  <script defer src="https://www.googletagmanager.com/gtag/js?id=AW-18321476060"></script>',
        ''
    )
    text = text.replace(
        '<script defer src="https://www.googletagmanager.com/gtag/js?id=AW-18321476060"></script>',
        ''
    )
    text = text.replace(
        "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' https://www.googletagmanager.com https://googleads.g.doubleclick.net; style-src 'self'; font-src 'self' data:; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://www.google.com.hk https://ssl.google-analytics.com; connect-src 'self' https://www.googletagmanager.com https://www.google.com https://www.google.com.hk https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google-analytics.com https://stats.g.doubleclick.net https://region1.google-analytics.com; frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com;",
        "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self'; font-src 'self' data:; img-src 'self' data:; connect-src 'self'; frame-src 'self' https://www.youtube-nocookie.com;"
    )
    if text != original:
        p.write_text(text, encoding='utf-8')

js = root / 'site.js'
text = js.read_text(encoding='utf-8')
text = text.replace(
    "window.dataLayer = window.dataLayer || [];\nfunction gtag() {\n  window.dataLayer.push(arguments);\n}\ngtag('js', new Date());\ngtag('config', 'AW-18321476060');\n\n",
    ''
)
js.write_text(text, encoding='utf-8')

print('GTM cleanup complete')
