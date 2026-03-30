import { TextStyle } from "react-native";

const fontFamily = "Pretendard";

type FontWeight = TextStyle["fontWeight"];

const weight = {
  light: "300" as FontWeight,
  regular: "400" as FontWeight,
  medium: "500" as FontWeight,
  semiBold: "600" as FontWeight,
  bold: "700" as FontWeight,
};

export const typography = {
  // ── Heading ──────────────────────────────────
  h1: { fontFamily, fontSize: 32, fontWeight: weight.semiBold, lineHeight: 39.2 },
  h2: { fontFamily, fontSize: 32, fontWeight: weight.light,   lineHeight: 39.2 },
  h3: { fontFamily, fontSize: 28, fontWeight: weight.bold,    lineHeight: 39.2 },
  h4: { fontFamily, fontSize: 28, fontWeight: weight.light,   lineHeight: 39.2 },
  h5: { fontFamily, fontSize: 24, fontWeight: weight.semiBold, lineHeight: 33.6 },
  h6: { fontFamily, fontSize: 24, fontWeight: weight.regular, lineHeight: 33.6 },
  h7: { fontFamily, fontSize: 20, fontWeight: weight.semiBold, lineHeight: 28 },
  h8: { fontFamily, fontSize: 18, fontWeight: weight.semiBold, lineHeight: 25.2 },

  // ── Body ─────────────────────────────────────
  b1: { fontFamily, fontSize: 20, fontWeight: weight.regular, lineHeight: 28 },
  // b2, b3: Figma에서 % 단위 → fontSize × % 로 환산
  b2: { fontFamily, fontSize: 16, fontWeight: weight.semiBold, lineHeight: 16 * 1.435 }, // 143.5%
  b3: { fontFamily, fontSize: 16, fontWeight: weight.regular,  lineHeight: 16 * 2.33  }, // 233%
  b4: { fontFamily, fontSize: 15, fontWeight: weight.bold,    lineHeight: 22.3 },
  b5: { fontFamily, fontSize: 15, fontWeight: weight.regular, lineHeight: 22.3 },
  b6: { fontFamily, fontSize: 15, fontWeight: weight.medium,  lineHeight: 22.3 },
  b7: { fontFamily, fontSize: 14, fontWeight: weight.medium,  lineHeight: 22.3 },
  b8: { fontFamily, fontSize: 14, fontWeight: weight.semiBold, lineHeight: 21.5 },
  b9: { fontFamily, fontSize: 14, fontWeight: weight.regular, lineHeight: 21.5 },

  // ── Caption ───────────────────────────────────
  c1: { fontFamily, fontSize: 13, fontWeight: weight.bold,    lineHeight: 18.8 },
  c2: { fontFamily, fontSize: 13, fontWeight: weight.semiBold, lineHeight: 18.8 },
  c3: { fontFamily, fontSize: 13, fontWeight: weight.regular, lineHeight: 18.8 },
  c4: { fontFamily, fontSize: 12, fontWeight: weight.medium,  lineHeight: 16.5 },
  c5: { fontFamily, fontSize: 11, fontWeight: weight.semiBold, lineHeight: 14 },
} satisfies Record<string, TextStyle>;

export type TypographyKey = keyof typeof typography;
