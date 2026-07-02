# unofficial-thesvg-iconset

基于 theSVG metadata 生成的非官方 iconset manifests。

你可以通过下面两个入口使用图标集：

- release 分支：https://github.com/xream/thesvg-iconset/tree/release
- GitHub Releases：https://github.com/xream/thesvg-iconset/releases

优先使用 release 分支中的图标集文件链接。

每个生成的 JSON 文件对应一个 theSVG variant，例如 `default.json`、
`color.json` 或 `mono.json`。

与 theSVG 官方数据不同，`collection: "azure"`、`collection: "aws"` 和
`collection: "gcp"` 会拆到独立 collection 文件中：`default` variant 使用
`azure.json`、`aws.json`、`gcp.json`，其他 variant 使用 `azure-color.json`、
`aws-32.json`、`gcp-mono.json` 这类文件名，不再混入共享 variant 文件。

与 theSVG 官方行为不同，`default.json` 只包含来源 `variants` 里仅有
`default` 一项的图标。

选择文件前，建议先查看 theSVG 官方对 Variants 的说明：
https://github.com/glincker/thesvg#variants

生成文件只包含指向 upstream SVG 的链接，不重新分发 SVG 文件。单个图标仍受
各自 upstream license 和品牌/商标使用规则约束。

license 和商标声明见 [NOTICE.md](NOTICE.md)。
