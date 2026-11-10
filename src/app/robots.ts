
import type { MetadataRoute } from "next";

const baseUrl = "https://ervinosmani.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
