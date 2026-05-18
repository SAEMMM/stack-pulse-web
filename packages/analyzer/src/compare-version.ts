import { VersionStatus } from "./types";
import semver from "semver";

export function compareVersion(
  currentRange: string,
  latestVersion: string | null,
): VersionStatus {
  // 최신 버전을 못 가져온 경우
  if (latestVersion === null) {
    return "unknown";
  }

  // 최신 버전이 semver 형식인지 확인
  if (!semver.valid(latestVersion)) {
    return "unknown";
  }

  // 현재 버전 범위가 semver 형식인지 확인
  if (!semver.validRange(currentRange)) {
    return "unknown";
  }

  return semver.satisfies(latestVersion, currentRange)
    ? "up-to-date"
    : "outdated";
}
