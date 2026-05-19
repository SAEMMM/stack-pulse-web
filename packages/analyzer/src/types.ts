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

export type AnalyzedDependency = PackageDependency & {
  latestVersion: string | null;
  status: VersionStatus;
};

export type PackageAnalysis = {
  packageName: string | null;
  dependencies: AnalyzedDependency[];
};
