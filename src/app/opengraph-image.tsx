import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ervin Osmani — Software Developer | Selected Engineering Work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * An original editorial social card. The canvas represents the portfolio,
 * never a screenshot or visual identity of Aurelia or CommerceOps.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundColor: "#F7F6F2",
          color: "#18232B",
          fontFamily: "Arial, sans-serif",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>E/O</span>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3 }}>
            SELECTED ENGINEERING WORK
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, letterSpacing: -5, lineHeight: 1.05 }}>
            Ervin Osmani.
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#3043DF" }}>
            Software Developer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #18232B",
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 600 }}>
            Thoughtful interfaces. Reliable systems.
          </span>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: 1 }}>
            ERVINOSMANI.VERCEL.APP
          </span>
        </div>
      </div>
    ),
    size,
  );
}
