import { describe, expect, it } from "vitest";

import { analyzePackageJson } from "./analyze-package-json";

type Fetcher = Parameters<typeof analyzePackageJson>[1];

describe("analyzePackageJson", () => {
  it("package.json을 분석해서 최신 버전과 상태를 반환해야 합니다.", async () => {
    const fetcher: Fetcher = async (input) => {
      const url = input.toString();

      if (url.includes("next")) {
        return new Response(JSON.stringify({ version: "15.3.0" }), {
          status: 200,
        });
      }

      return new Response(JSON.stringify({ version: "19.1.0" }), {
        status: 200,
      });
    };

    const result = await analyzePackageJson(
      JSON.stringify({
        name: "demo-app",
        dependencies: {
          next: "^15.0.0",
          react: "^18.0.0",
        },
      }),
      fetcher,
    );

    expect(result).toEqual({
      packageName: "demo-app",
      dependencies: [
        {
          name: "next",
          currentRange: "^15.0.0",
          group: "dependencies",
          latestVersion: "15.3.0",
          status: "up-to-date",
        },
        {
          name: "react",
          currentRange: "^18.0.0",
          group: "dependencies",
          latestVersion: "19.1.0",
          status: "outdated",
        },
      ],
    });
  });
});
