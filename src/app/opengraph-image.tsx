
import { ImageResponse } from "next/og";

// Use the Edge implementation of ImageResponse.
export const runtime = "edge";

export const alt =
  "Ervin Osmani — Making Ideas Work | Software Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background: "#f6f4ef",
          color: "#1b2328",
          fontFamily: "sans-serif",
          gap: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            ER/O — SOFTWARE DEVELOPMENT
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-5px",
              lineHeight: 1.05,
            }}
          >
            <span>MAKING</span>

            <span style={{ color: "#3043df" }}>
              IDEAS
            </span>

            <span>WORK.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            ERVIN OSMANI / SELECTED WORK
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "370px",
            background: "#3043df",
            borderRadius: "24px",
            padding: "34px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            2026
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 135,
              fontWeight: 800,
              letterSpacing: "-12px",
            }}
          >
            EO.
          </div>

          <div
            style={{
              display: "flex",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.6,
            }}
          >
            WEB APPS / BACKEND / AUTOMATION
          </div>
        </div>
      </div>
    ),
    size
  );
}
