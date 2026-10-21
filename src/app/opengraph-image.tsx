import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Aditya Kumar Vaish — Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bold = await readFile(
  join(process.cwd(), "public/fonts/Space_Grotesk/static/SpaceGrotesk-Bold.ttf")
);

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B1B1D",
          color: "#EDEDED",
          padding: 72,
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 16, height: 16, background: "#D71921" }} />
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#8C8C8C" }}>
            ADITYAVAISH.DEV
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, fontWeight: 700 }}>
            Aditya Kumar Vaish
          </div>
          <div style={{ fontSize: 36, color: "#D71921", marginTop: 24 }}>
            Backend Engineer
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#8C8C8C" }}>
          Java · Spring Boot · Distributed Systems
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Grotesk", data: bold, weight: 700, style: "normal" }] }
  );
}
