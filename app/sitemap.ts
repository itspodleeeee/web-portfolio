import type { MetadataRoute } from "next";
import { SITE_URL } from "../data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const baseUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}#experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];
}
