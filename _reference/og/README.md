# Regenerating `public/og-default.png`

`og-default.html` is the source for the site's default share card. It is kept
here rather than in `app/` on purpose: it is a build-time design asset, not a
route, and putting it under `app/` would publish it as a page.

The card is 1200x630, the size LinkedIn, Meta and X all accept without
recropping. Anything under 600x315 renders as a small square thumbnail instead
of a large card, which is the whole failure this asset exists to prevent.

## Regenerate

```bash
cd _reference/og
cp ../../public/fonts/Inter-500.woff2 ../../public/fonts/Inter-600.woff2 .
cp ../../public/img/pJFWiP5x9jQeaGSDwZogaYz9Ot8.png logo.png
python3 -m http.server 8791 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1200,630 \
  --virtual-time-budget=4000 \
  --screenshot=og-2x.png http://localhost:8791/og-default.html
sips -Z 1200 og-2x.png --out ../../public/og-default.png
kill %1; rm -f Inter-*.woff2 logo.png og-2x.png
```

Two gotchas, both cost time the first go:

1. **It has to be served over HTTP.** Opening the file with `file://` — even
   with `--allow-file-access-from-files` — silently fails to load the `@font-face`
   woff2 and Chrome falls back to Arial. Embedding the font as a `data:` URI
   fails too, and falls back to a *serif*, which is more obviously wrong but
   equally silent. Neither produces an error; you only catch it by looking.
2. **Render at 2x and downscale.** A direct 1200x630 shot has visibly soft text.

## Per-post cards

A post can override this default with an `image:` field in its frontmatter,
pointing at a site-relative 1200x630 file, e.g.:

```yaml
image: "/img/og-invoice-integrity.png"
```

`lib/posts.js` reads it, `app/blog/[slug]/page.jsx` passes it to `pageMetadata()`,
and it lands in both the OpenGraph tags and the BlogPosting schema. Posts without
one fall back to this card rather than to no image at all.
