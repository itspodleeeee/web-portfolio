const normalizeUrl = (value: string) => value.replace(/\/+$/, "");

const resolveSiteUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeUrl(explicit);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return `https://${normalizeUrl(productionHost)}`;

  const vercelHost = process.env.VERCEL_URL;
  if (vercelHost) return `https://${normalizeUrl(vercelHost)}`;

  return "https://example.com";
};

export const SITE_URL = resolveSiteUrl();
