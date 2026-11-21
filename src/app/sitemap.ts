
import type { MetadataRoute } from "next";

const baseUrl = "https://ervinosmani.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies/aurelia`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies/commerceops`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
