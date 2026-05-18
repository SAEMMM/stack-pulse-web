import { describe, expect, it } from "vitest";

import { parsePackageJson } from "./parse-package-json";

describe("parsePackageJson", () => {
  it("dependency와 devDependency를 모두 읽어야 합니다.", () => {
    const result = parsePackageJson(
      JSON.stringify({
        name: "demo-app",
        dependencies: {
          next: "^15.0.0",
          react: "^19.0.0",
        },
        devDependencies: {
          typescript: "^6.0.0",
        },
      }),
    );

    expect(result).toEqual({
      packageName: "demo-app",
      dependencies: [
        { name: "next", currentRange: "^15.0.0", group: "dependencies" },
        { name: "react", currentRange: "^19.0.0", group: "dependencies" },
        {
          name: "typescript",
          currentRange: "^6.0.0",
          group: "devDependencies",
        },
      ],
    });
  });

  it("name이 없다면 packageName은 null이어야 합니다.", () => {
    const result = parsePackageJson(
      JSON.stringify({
        dependencies: {
          next: "^15.0.0",
        },
      }),
    );

    expect(result.packageName).toBeNull();
  });

  it("input이 유효한 JSON이 아니라면 에러입니다.", () => {
    expect(() => parsePackageJson("json이 아닙니다.")).toThrow();
  });

  it("dependencies가 객체가 아니라면 에러입니다.", () => {
    expect(() =>
      parsePackageJson(
        JSON.stringify({
          dependencies: ["next"],
        }),
      ),
    ).toThrow("dependencies은 객체여야 합니다.");
  });
});
