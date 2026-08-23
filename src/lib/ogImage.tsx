// Shared visual template for every route's opengraph-image.tsx (root,
// [slug], over-ons, veelgestelde-vragen) so a link shared on WhatsApp/
// LinkedIn/etc. always shows a branded card instead of no preview at all
// (there was no og:image anywhere before this). Kept to satori/ImageResponse's
// supported CSS subset (flexbox, no external fonts) — the brand read comes
// from color and layout, not the custom condensed typeface used on-site.
export function OgImageTemplate({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#0E1013",
        backgroundImage:
          "radial-gradient(circle at 85% 20%, rgba(192,138,62,0.18), transparent 55%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: "#1A1D22",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M4 12.5L12 5.5L20 12.5" stroke="#FAF7F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12.5V19M20 12.5V19" stroke="#FAF7F1" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#FAF7F1", letterSpacing: -0.5 }}>
          Vergunning<span style={{ color: "#C08A3E" }}>tekening</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#C08A3E",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#FAF7F1",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", width: 140, height: 6, backgroundColor: "#C08A3E", borderRadius: 3 }} />
      </div>
    </div>
  );
}

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
