import { describe, expect, it } from "vitest";

import { getLatestPackageVersion } from "./npm-registry";

describe("getLatestPackageVersion", () => {
  it("npm registry에서 최신 버전을 가져와야 합니다.", async () => {
    const fetcher = async () =>
      new Response(JSON.stringify({ name: "next", version: "15.3.0" }), {
        status: 200,
      });

    const result = await getLatestPackageVersion("next", fetcher);

    expect(result).toBe("15.3.0");
  });

  it("response가 준비되지 않았다면 null을 반환해야 합니다.", async () => {
    const fetcher = async () =>
      new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    const result = await getLatestPackageVersion("not-real-package", fetcher);

    expect(result).toBeNull();
  });

  it("response가 version을 포함하지 않는다면 null을 반환해야 합니다.", async () => {
    const fetcher = async () =>
      new Response(JSON.stringify({ name: "next" }), { status: 200 });

    const result = await getLatestPackageVersion("next", fetcher);

    expect(result).toBeNull();
  });
});
