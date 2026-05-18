type Fetcher = typeof fetch;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function getLatestPackageVersion(
  packageName: string,
  fetcher: Fetcher = fetch,
): Promise<string | null> {
  const url = `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`;

  const response = await fetcher(url);

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as unknown;

  if (!isRecord(data)) {
    return null;
  }

  if (typeof data.version !== "string") {
    return null;
  }

  return data.version;
}
