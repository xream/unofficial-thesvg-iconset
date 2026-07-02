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
  ]);
  const [colorSet, defaultSet, monoSet] = iconsets;

  assert.deepEqual(iconsets.map((iconset) => iconset.variant), [
    "color",
    "default",
    "mono",
  ]);
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
  assert.equal(defaultSet.fileName, "default.json");
  assert.deepEqual(defaultSet.data.icons, [
    {
      name: "01.AI (零一万物)",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/01dotai/color.svg",
      license: "MIT",
    },
    {
      name: "100TB",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/100tb/default.svg",
      license: "Unknown",
    },
  ]);
  assert.equal(monoSet.fileName, "mono.json");
  assert.deepEqual(monoSet.data.icons, [
    {
      name: "01.AI (零一万物)",
      url: "https://raw.githubusercontent.com/glincker/thesvg/refs/heads/main/public/icons/01dotai/mono.svg",
      license: "MIT",
    },
  ]);
});
