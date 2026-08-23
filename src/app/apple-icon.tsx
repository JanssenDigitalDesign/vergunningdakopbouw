import { ImageResponse } from "next/og";

// Generated from this site's own BrandIcon (see components/BrandMark.tsx)
// so the favicon matches the header mark and brand palette exactly,
// instead of every site sharing one generic icon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15120d",
          color: "#b8952e",
          borderRadius: 36,
        }}
      >
        <svg width="124" height="124" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V13h16v7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 13V8l6-4 6 4v5" stroke="currentColor" strokeWidth="1.7" strokeDasharray="1.6 1.8" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
    ),
    size
  );
}
