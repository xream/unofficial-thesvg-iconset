import assert from "node:assert/strict";
import test from "node:test";
import { buildIconsets } from "./build-iconsets.mjs";

test("builds variant iconsets with canonical raw URLs when present", () => {
  const iconsets = buildIconsets([
    {
      slug: "01dotai",
      title: "01.AI (零一万物)",
      license: "MIT",
      variants: {
        default: "/icons/01dotai/color.svg",
        color: "/icons/01dotai/color.svg",
        mono: "/icons/01dotai/mono.svg",
      },
    },
    {
      slug: "100tb",
      title: "100TB",
      variants: {
        default: "/icons/100tb/default.svg",
      },
    },
    {
      slug: "azure",
      title: "Azure",
      collection: "azure",
      variants: {
        color: "/icons/azure/color.svg",
      },
    },
    {
      slug: "aws",
      title: "AWS",
      collection: "aws",
      variants: {
        default: "/icons/aws/default.svg",
        color: "/icons/aws/color.svg",
      },
    },
    {
      slug: "gcp",
      title: "Google Cloud",
      collection: "gcp",
      variants: {
        default: "icons/gcp/default.svg",
      },
    },
  ]);
  const iconsetsByFile = Object.fromEntries(
    iconsets.map((iconset) => [iconset.fileName, iconset]),
  );

  assert.deepEqual(iconsets.map((iconset) => iconset.variant), [
    "aws",
    "aws-color",
    "azure-color",
    "color",
    "default",
    "gcp",
    "mono",
  ]);
  const colorSet = iconsetsByFile["color.json"];
  assert.equal(colorSet.fileName, "color.json");
  assert.equal(colorSet.data.name, "Unofficial theSVG Iconset - color");
  assert.equal(colorSet.data.source, "https://github.com/glincker/thesvg");
  assert.equal(
    colorSet.data.legal,
    "https://github.com/glincker/thesvg/blob/main/LEGAL.md",
  );
  assert.match(colorSet.data.description, /仅包含链接清单/);
  assert.deepEqual(colorSet.data.icons, [
    {
      name: "01.AI (零一万物)",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/01dotai/color.svg",
      license: "MIT",
    },
  ]);
  assert.equal(
    iconsetsByFile["aws.json"].data.name,
    "Unofficial theSVG Iconset - aws",
  );
  assert.deepEqual(iconsetsByFile["aws.json"].data.icons, [
    {
      name: "AWS",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/aws/default.svg",
      license: "Unknown",
    },
  ]);
  assert.deepEqual(iconsetsByFile["aws-color.json"].data.icons, [
    {
      name: "AWS",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/aws/color.svg",
      license: "Unknown",
    },
  ]);
  assert.deepEqual(iconsetsByFile["azure-color.json"].data.icons, [
    {
      name: "Azure",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/azure/color.svg",
      license: "Unknown",
    },
  ]);
  const defaultSet = iconsetsByFile["default.json"];
  assert.equal(defaultSet.fileName, "default.json");
  assert.deepEqual(defaultSet.data.icons, [
    {
      name: "100TB",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/100tb/default.svg",
      license: "Unknown",
    },
  ]);
  assert.deepEqual(iconsetsByFile["gcp.json"].data.icons, [
    {
      name: "Google Cloud",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/gcp/default.svg",
      license: "Unknown",
    },
  ]);
  const monoSet = iconsetsByFile["mono.json"];
  assert.equal(monoSet.fileName, "mono.json");
  assert.deepEqual(monoSet.data.icons, [
    {
      name: "01.AI (零一万物)",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/01dotai/mono.svg",
      license: "MIT",
    },
  ]);
});
