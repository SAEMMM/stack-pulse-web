import { describe, expect, it } from "vitest";

import { compareVersion } from "./compare-version";

describe("compareVersion", () => {
  it("최신 버전이 현재 범위를 만족하면 up-to-date여야 합니다.", () => {
    expect(compareVersion("^15.0.0", "15.3.0")).toBe("up-to-date");
  });

  it("최신 버전이 현재 범위를 만족하지 않으면 outdated여야 합니다.", () => {
    expect(compareVersion("^15.0.0", null)).toBe("outdated");
  });

  it("최신 버전이 null이면 unknown이어야 합니다.", () => {
    expect(compareVersion("^15.0.0", null)).toBe("unknown");
  });

  it("최신 버전이 유효한 semver 형식이 아니면 unknown여야 합니다.", () => {
    expect(compareVersion("^15.0.0", "beta")).toBe("unknown");
  });

  it("현재 범위가 유효한 semver 범위가 아니면 unknown여야 합니다.", () => {
    expect(compareVersion("not-a-version", "15.3.0")).toBe("unknown");
  });
});
