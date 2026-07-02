#!/usr/bin/env node
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DATA_URL =
  "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/src/data/icons.json";
const RAW_PUBLIC_BASE =
  "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public";
const SOURCE_REPOSITORY = "https://github.com/glincker/thesvg";
const LEGAL_URL = "https://github.com/glincker/thesvg/blob/main/LEGAL.md";
const DISCLAIMER_URL =
  "https://github.com/glincker/thesvg/blob/main/DISCLAIMER.md";
const TRADEMARK_NOTICE =
  "Icon names, logos, and trademarks are property of their respective owners. This iconset is not affiliated with, endorsed by, or sponsored by those owners.";

export function buildIconsets(iconData) {
  const byVariant = new Map();

  for (const icon of iconData) {
    if (icon.collection === "aws") continue;
    const variants = Object.entries(icon.variants ?? {});
    for (const [variant, iconPath] of variants) {
      if (variant === "default" && variants.length !== 1) continue;
      const normalizedPath = iconPath.startsWith("/") ? iconPath : `/${iconPath}`;
      const icons = byVariant.get(variant) ?? [];
      icons.push({
        name: icon.title,
        url: `${RAW_PUBLIC_BASE}${normalizedPath}`,
        license: icon.license ?? "Unknown",
      });
      byVariant.set(variant, icons);
    }
  }

  return [...byVariant.entries()]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([variant, icons]) => ({
      variant,
      fileName: `${variant}.json`,
      data: {
        name: `Unofficial theSVG Iconset - ${variant}`,
        description: `xream 基于 theSVG 转换的 ${variant} variant 图标集；仅包含链接清单，不重新分发 SVG。图标版权、商标和 license 归各自权利方及 upstream license 约束。`,
        source: SOURCE_REPOSITORY,
        sourceData: DATA_URL,
        legal: LEGAL_URL,
        disclaimer: DISCLAIMER_URL,
        trademarkNotice: TRADEMARK_NOTICE,
        icons,
      },
    }));
}

async function fetchIconData() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${DATA_URL}: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

async function main() {
  const outDir = process.argv[2] ?? "dist/iconsets";
  const iconsets = buildIconsets(await fetchIconData());

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  for (const iconset of iconsets) {
    await writeFile(
      path.join(outDir, iconset.fileName),
      `${JSON.stringify(iconset.data, null, 2)}\n`,
    );
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
