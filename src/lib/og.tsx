import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function renderOgCard({
  eyebrow,
  title,
  titleItalic,
  footer,
  accent = "#F2B33D",
}: {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  footer: string;
  accent?: string;
}) {
  const [fraunces, frauncesItalic, inter] = await Promise.all([
    font("fraunces-latin-400-normal.woff"),
    font("fraunces-latin-400-italic.woff"),
    font("inter-latin-600-normal.woff"),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F3EDE3", color: "#1F1A17", padding: "72px 80px", fontFamily: "Inter" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#B8321C" }}>
          {/* A drawn dot, not ✺: the bundled fonts lack that glyph and Satori would fetch one at build. */}
          <span style={{ display: "flex", width: 16, height: 16, borderRadius: 999, background: "#E8452C" }} />
          <span>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Fraunces", fontSize: 88, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
          {title ? <span style={{ marginRight: 20 }}>{title}</span> : null}
          {titleItalic ? (
            <span style={{ fontStyle: "italic", background: accent, borderRadius: 14, padding: "0 16px" }}>{titleItalic}</span>
          ) : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span>{footer}</span>
          <span style={{ display: "flex", background: "#1F4D3A", color: "#F3EDE3", borderRadius: 999, padding: "12px 26px" }}>Ifeanyi Onyekwelu</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        { name: "Fraunces", data: frauncesItalic, style: "italic", weight: 400 },
        { name: "Inter", data: inter, style: "normal", weight: 600 },
      ],
    },
  );
}
