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
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", background: "#0D0B0A", color: "#F3EDE3", padding: "72px 80px", fontFamily: "Inter" }}>
        {/* Ember glow, as in the site hero. */}
        <div style={{ position: "absolute", top: -560, right: -360, width: 1300, height: 1300, display: "flex", backgroundImage: "radial-gradient(circle at 50% 50%, rgba(232,69,44,0.8) 0%, rgba(122,28,16,0.4) 30%, rgba(13,11,10,0) 50%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#9A8F86" }}>
          {/* A drawn dot, not ✺: the bundled fonts lack that glyph and Satori would fetch one at build. */}
          <span style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#E8452C" }} />
          <span>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", fontSize: 84, lineHeight: 1.04, letterSpacing: -3, maxWidth: 1000 }}>
          {title ? <span style={{ marginRight: 22 }}>{title}</span> : null}
          {titleItalic ? (
            <span style={{ fontFamily: "Fraunces", fontStyle: "italic", letterSpacing: -1, color: accent }}>{titleItalic}</span>
          ) : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#9A8F86" }}>
          <span>{footer}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(21,18,16,0.8)", border: "1px solid #2B2420", color: "#F3EDE3", borderRadius: 999, padding: "10px 26px 10px 10px" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 999, background: "#E8452C", color: "#0D0B0A", fontSize: 18 }}>IO</span>
            Ifeanyi Onyekwelu
          </span>
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
