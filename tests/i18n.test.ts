import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DICTIONARIES } from "../lib/i18n/dictionaries";
import { SUPPORTED_LANGUAGES, SupportedLocale } from "../lib/i18n/types";

describe("Multilingual System - Dictionary Integrity", () => {
  it("supports exactly the required 8 languages", () => {
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    assert.deepEqual(codes, ["en", "hi", "kn", "te", "ta", "ml", "mr", "bn"]);
  });

  it("has non-empty dictionaries for all 8 languages", () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      const dict = DICTIONARIES[lang.code as SupportedLocale];
      assert.ok(dict, `Dictionary missing for ${lang.code}`);
      assert.ok(Object.keys(dict).length > 20, `Dictionary too sparse for ${lang.code}`);
    }
  });

  it("contains critical brand and safety keys across all languages", () => {
    const criticalKeys = [
      "brand.name",
      "brand.primaryTagline",
      "brand.secondaryTagline",
      "nav.home",
      "nav.understand",
      "safety.alertTitle",
      "safety.callEmergency",
      "track.title",
      "summary.title",
    ];

    for (const lang of SUPPORTED_LANGUAGES) {
      const dict = DICTIONARIES[lang.code as SupportedLocale];
      for (const key of criticalKeys) {
        assert.ok(dict[key], `Missing critical key '${key}' in language ${lang.code}`);
        assert.ok(dict[key].trim().length > 0, `Empty translation for '${key}' in ${lang.code}`);
      }
    }
  });

  it("enforces RITVYA as official brand name across all languages without alteration", () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      const dict = DICTIONARIES[lang.code as SupportedLocale];
      assert.equal(dict["brand.name"], "RITVYA");
    }
  });
});
