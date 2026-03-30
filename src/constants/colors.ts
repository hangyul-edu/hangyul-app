export const colors = {
  // 팔레트 없는 단독 브랜드 컬러
  brandTeal: "#66CCCC",

  // Semantic
  positive: "#547CF1",
  negative: "#F24147",

  // Black
  black: {
    900: "#000000",
    800: "#262C31",
    700: "#5A636A",
    600: "#778088",
    500: "#ADB4BA",
    400: "#CCD1D7",
    300: "#E6E8EB",
    200: "#F2F4F5",
    100: "#FFFFFF",
  },

  // Primary Color Palettes
  // primary.900 = 브랜드 메인 컬러 (#FF6700)
  primary: {
    900: "#FF6700",
    800: "#FF8700",
    700: "#FF9900",
    600: "#FFAC00",
    500: "#FFBA00",
    400: "#FFC41F",
    300: "#FFD04A",
    200: "#FFDC7E",
    100: "#FFEAB1",
    50: "#FFF7E0",
  },
} as const;

export type Colors = typeof colors;
