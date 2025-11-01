import type { MetaArgs } from "react-router";
import type { SeoConfig } from "@shopify/hydrogen";

// 全站默认 SEO（标题 + 描述）
const DEFAULT_TITLE =
  "Blackneck Coffee | Yunnan Specialty Coffee Protecting the Black-Necked Crane’s Home";

const DEFAULT_DESCRIPTION =
  "Blackneck Coffee sources high-altitude coffee from Yunnan, celebrating the harmony between people, coffee, and nature while supporting the protection of the Black-Necked Crane’s habitat.";

export const meta = ({ data }: MetaArgs<any>) => {
  // 若单页面设置了独立 SEO，优先使用该值
  const seoData = (data?.seo as SeoConfig) || {};

  const title = seoData.title || DEFAULT_TITLE;
  const description = seoData.description || DEFAULT_DESCRIPTION;

  return [
    { title },
    { name: "description", content: description },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },

    // Keywords（可随时修改）
    {
      name: "keywords",
      content:
        "Yunnan coffee, Blackneck Coffee, specialty coffee, single origin coffee, sustainable coffee, high altitude coffee, arabica",
    },
  ];
};
