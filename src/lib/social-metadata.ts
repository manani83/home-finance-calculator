import type { Metadata } from "next";

export const socialImageSize = { width: 1200, height: 630 };

type SocialMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  imageSlug: string;
  openGraphType?: "website" | "article";
  modifiedTime?: string;
};

export function socialImageUrl(imageSlug: string) {
  return `/api/og?slug=${encodeURIComponent(imageSlug)}`;
}

export function buildPageMetadata({
  title,
  description,
  pathname,
  imageSlug,
  openGraphType = "website",
  modifiedTime,
}: SocialMetadataInput): Metadata {
  const image = socialImageUrl(imageSlug);

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url: pathname,
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [{ url: image, ...socialImageSize, alt: `${title} 공유 이미지` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
