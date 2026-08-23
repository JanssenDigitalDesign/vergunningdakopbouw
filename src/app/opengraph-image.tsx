import { ImageResponse } from "next/og";
import { getLandingPageContent } from "@/lib/content";
import { OgImageTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const content = await getLandingPageContent();
  return new ImageResponse(
    <OgImageTemplate eyebrow={`${content.service_area} · ${content.delivery_time}`} title={content.h1} />,
    size
  );
}
