import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  colorSpaceStyle,
  hexToOklch,
  palette,
  parseColorSpace,
  swatch,
  TOKENS,
} from "./palette";

describe("parseColorSpace", () => {
  it("reads a hue string with the counter hue at ±137.5", () => {
    assert.deepEqual(parseColorSpace("170+"), { a: 170, b: 307.5 });
    assert.deepEqual(parseColorSpace("170-"), { a: 170, b: 32.5 });
    assert.deepEqual(parseColorSpace("300+"), { a: 300, b: 77.5 });
    assert.deepEqual(parseColorSpace("12.5-"), { a: 12.5, b: 235 });
  });

  it("keeps the presets' hand-picked pairs", () => {
    assert.deepEqual(parseColorSpace("carmine"), {
      a: 15,
      b: 170,
      preset: "carmine",
    });
  });

  it("falls back to petrol for unknown names, typos and nothing", () => {
    for (const v of ["cyan", "carmin", "170", "+170", "", undefined]) {
      assert.equal(parseColorSpace(v).preset, "petrol");
    }
  });
});

describe("palette", () => {
  it("produces all 54 tokens as hex", () => {
    const p = palette({ a: 170, b: 307.5 });
    assert.equal(TOKENS.length, 54);
    for (const t of TOKENS) assert.match(p[t].hex, /^#[0-9a-f]{6}$/);
  });

  it("keeps the hue when fitting an out-of-gamut colour", () => {
    // A saturated light blue is far outside sRGB.
    const s = swatch(0.8, 0.21, 265);
    assert.ok(s.c < 0.21);
    const back = hexToOklch(s.hex);
    assert.ok(back);
    assert.ok(Math.abs(back.h - 265) < 2, `hue drifted to ${back.h}`);
    assert.ok(Math.abs(back.l - 0.8) < 0.01);
  });

  it("maps a style per colorSpace", () => {
    const style = colorSpaceStyle("40+");
    assert.equal(Object.keys(style).length, 54);
    assert.match(style["--p-cas5"], /^#[0-9a-f]{6}$/);
  });
});
