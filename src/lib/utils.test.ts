import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPageUrl,
  buildSearchUrl,
  cleanSummary,
  isCountdownExpired,
  normalizePage,
  selectNextLaunch,
} from "./utils.ts";

test("cleanSummary removes syndicated WordPress boilerplate", () => {
  assert.equal(
    cleanSummary(
      "A concise report. The post A concise report appeared first on SpaceNews.",
    ),
    "A concise report.",
  );
});

test("normalizePage accepts only positive page numbers", () => {
  assert.equal(normalizePage("3"), 3);
  assert.equal(normalizePage("-2"), 1);
  assert.equal(normalizePage("space"), 1);
});

test("query builders safely encode searches", () => {
  assert.equal(
    buildSearchUrl("/articles", " Moon & Mars "),
    "/articles?q=Moon+%26+Mars",
  );
  assert.equal(
    buildPageUrl("/blogs", 2, "ISS & Moon"),
    "/blogs?q=ISS+%26+Moon&page=2",
  );
});

test("selectNextLaunch ignores completed and expired launches", () => {
  const now = Date.parse("2026-07-19T12:00:00Z");
  const launches = [
    { window_start: "2026-07-19T11:00:00Z", status: { abbrev: "Go" } },
    { window_start: "2026-07-19T13:00:00Z", status: { abbrev: "Success" } },
    { window_start: "2026-07-19T14:00:00Z", status: { abbrev: "Go" } },
  ];
  assert.equal(
    selectNextLaunch(launches, now)?.window_start,
    "2026-07-19T14:00:00Z",
  );
});

test("expired countdowns are identified at and after the window", () => {
  const now = Date.parse("2026-07-19T12:00:00Z");
  assert.equal(isCountdownExpired("2026-07-19T12:00:00Z", now), true);
  assert.equal(isCountdownExpired("2026-07-19T12:01:00Z", now), false);
});
