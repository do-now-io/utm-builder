export function buildUtmUrl(
  baseUrl: string,
  params: Record<string, string>
): string {
  try {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}
