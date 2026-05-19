import { DependencyGroup, PackageDependency, ParsedPackageJson } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// package.json에서 dependencies 추출
function readDependencyGroup(
  packageJson: Record<string, unknown>,
  group: DependencyGroup,
): PackageDependency[] {
  const value = packageJson[group];

  if (value === undefined) {
    return [];
  }

  if (!isRecord(value)) {
    throw new Error(`${group}은 객체여야 합니다.`);
  }

  return Object.entries(value).map(([name, currentRange]) => {
    if (typeof currentRange !== "string") {
      throw new Error(`${group}.${name}은 문자열이어야 합니다.`);
    }

    return { name, currentRange, group };
  });
}

export function parsePackageJson(input: string): ParsedPackageJson {
  const parsed = JSON.parse(input);

  if (!isRecord(parsed)) {
    throw new Error("package.json은 JSON 객체여야 합니다.");
  }

  const packageName = typeof parsed.name === "string" ? parsed.name : null;

  return {
    packageName,
    dependencies: [
      ...readDependencyGroup(parsed, "dependencies"),
      ...readDependencyGroup(parsed, "devDependencies"),
    ],
  };
}
