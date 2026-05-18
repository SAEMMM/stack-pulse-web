export type DependencyGroup = "dependencies" | "devDependencies";

export type PackageDependency = {
  name: string;
  currentRange: string;
  group: DependencyGroup;
};

export type ParsedPackageJson = {
  packageName: string | null;
  dependencies: PackageDependency[];
};

export type VersionStatus = "up-to-date" | "outdated" | "unknown";