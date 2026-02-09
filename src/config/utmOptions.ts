export const utmOptions = {
  utm_source: [
    "google",
    "facebook",
    "linkedin",
    "newsletter",
    "twitter",
    "instagram",
    "tiktok",
    "other",
  ],
  utm_medium: [
    "cpc",
    "email",
    "social",
    "organic",
    "referral",
    "display",
    "video",
    "affiliate",
  ],
  utm_campaign: [
    "spring-launch",
    "black-friday",
    "brand-awareness",
    "product-launch",
    "webinar",
    "ebook",
  ],
  utm_content: [
    "banner-top",
    "sidebar",
    "cta-button",
    "hero-image",
    "text-link",
    "footer",
  ],
  utm_term: [
    "awareness",
    "conversion",
    "retargeting",
    "engagement",
    "traffic",
  ],
} as const;

export type UtmKey = keyof typeof utmOptions;
