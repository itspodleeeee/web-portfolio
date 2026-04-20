const normalizeUrl = (value: string) => {
  const url = value.replace(/\/+$/, "");
  return url.startsWith("http") ? url : `https://${url}`;
};

const resolveSiteUrl = () => {
  // Priority order for URL resolution
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeUrl(explicit);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return normalizeUrl(productionHost);

  const vercelHost = process.env.VERCEL_URL;
  if (vercelHost) return normalizeUrl(vercelHost);

  // Fallback - update this with your actual domain
  return "https://johnwilberthbotin.vercel.app";
};

export const SITE_URL = resolveSiteUrl();
