import { ImageResponse } from "next/og";
import { OgImageTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    <OgImageTemplate eyebrow="Vragen" title="Veelgestelde vragen over vergunningtekeningen" />,
    size
  );
}
