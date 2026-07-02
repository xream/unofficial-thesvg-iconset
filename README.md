# thesvg-iconset

Unofficial iconset manifests generated from theSVG metadata.

[中文说明](README.zh-CN.md)

Use the iconsets from:

- Release branch: https://github.com/xream/thesvg-iconset/tree/release
- GitHub Releases: https://github.com/xream/thesvg-iconset/releases

Each generated JSON file maps one theSVG variant to an iconset, such as
`default.json`, `color.json`, or `mono.json`.

Unlike the official theSVG behavior, `default.json` only includes icons whose
source `variants` contains exactly `default` and no other variants.

Also unlike the official theSVG data, icons with `collection: "azure"` are
excluded.

See the official theSVG Variants guide before choosing a file:
https://github.com/glincker/thesvg#variants

The generated files contain links to upstream SVG files only. Individual icons
remain subject to their upstream licenses and brand/trademark guidelines.

See [NOTICE.md](NOTICE.md) for license and trademark notes.
