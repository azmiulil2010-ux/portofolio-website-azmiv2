const configuredSiteUrl =
  process.env.SITE_URL?.trim() ||
  (process.env.VERCEL_ENV === "production"
    ? "https://www.ulil-azmi.my.id"
    : process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`
    : process.env.VERCEL_URL?.trim()
      ? `https://${process.env.VERCEL_URL.trim()}`
      : "http://localhost:3000");

export const siteUrl = new URL(
  configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`
);

export function absoluteSiteUrl(path: string) {
  return new URL(path.replace(/^\/+/, ""), siteUrl).toString();
}

export function getAbsoluteImageUrl(imagePath?: string | null) {
  if (!imagePath) return undefined;

  try {
    const imageUrl = new URL(imagePath);
    if (imageUrl.protocol === "https:" || imageUrl.protocol === "http:") {
      return imageUrl.toString();
    }
  } catch {
    if (imagePath.startsWith("/") && !imagePath.startsWith("//")) {
      return absoluteSiteUrl(imagePath);
    }
  }

  return undefined;
}

export function getSeoDescription(description: string) {
  const normalizedDescription = description.replace(/\s+/g, " ").trim();
  return normalizedDescription.length > 200
    ? `${normalizedDescription.slice(0, 197).trimEnd()}...`
    : normalizedDescription;
}
