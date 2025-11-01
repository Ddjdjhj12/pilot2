// app/components/seo.tsx

import type { MetaArgs } from "@shopify/hydrogen";
import type { SeoConfig } from "@shopify/hydrogen";

/**
 * 全站统一 SEO 模板
 * 自动接管 Hydrogen 默认的 getSeoMeta 输出
 * 优先使用每页 data.seo，否则使用品牌默认信息
 */

export function meta({ data }: MetaArgs) {
  const defaultTitle = "Blackneck Coffee | Yunnan Specialty Coffee";
  const defaultDescription =
    "High-altitude Arabica coffee from Yunnan’s pristine highlands — inspired by the Black-necked Crane, dedicated to purity, craftsmanship, and sustainability.";

  const seoData = (data?.seo as SeoConfig) || {};
  const title = seoData.title || defaultTitle;
  const description = seoData.description || defaultDescription;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      name: "keywords",
      content:
        "Blackneck Coffee, Yunnan coffee, specialty coffee, single origin, sustainable coffee, high altitude coffee, Black-necked Crane",
    },
  ];
}
