import { PackageAnalysis } from "./types";
import { compareVersion } from "./compare-version";
import { getLatestPackageVersion } from "./npm-registry";
import { parsePackageJson } from "./parse-package-json";

// 실제 네트워크 요청을 하는 대신, 테스트에서 이 함수를 모킹할 수 있도록 fetcher 매개변수 추가
type Fetcher = Parameters<typeof getLatestPackageVersion>[1];

export async function analyzePackageJson(
  input: string,
  fetcher?: Fetcher,
): Promise<PackageAnalysis> {
  const parsed = parsePackageJson(input);

  // 여러 패키지의 버전을 동시에 가져오기 위해 Promise.all 사용
  const dependencies = await Promise.all(
    parsed.dependencies.map(async (dependency) => {
      const latestVersion = await getLatestPackageVersion(
        dependency.name,
        fetcher,
      );
      const status = compareVersion(dependency.currentRange, latestVersion);

      return {
        ...dependency,
        latestVersion,
        status,
      };
    }),
  );
  return {
    packageName: parsed.packageName,
    dependencies,
  };
}
