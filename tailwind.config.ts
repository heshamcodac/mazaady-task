import type { Config } from "tailwindcss";
import * as defaultColors from "tailwindcss/colors";

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  gray: defaultColors.gray,
  neutral: defaultColors.neutral,
  green: defaultColors.green,
  pink: defaultColors.pink,
  primary: "#D20653",
  primaryLight: "#fae6ed",
  primaryDark: "#9B0257",
  purple: "#44215D",
  yellow: "#FDBC01",
  // primary: {
  //   50: "#fef1f8",
  //   100: "#fee5f2",
  //   200: "#ffcae7",
  //   300: "#ff9fd1",
  //   400: "#ff64b1",
  //   500: "#fe3691",
  //   600: "#ef136d",
  //   700: "#d20653",
  //   800: "#ac0844",
  //   900: "#8f0c3c",
  //   950: "#58001f",
  // },
};
export { colors };

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx, module}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
  },
};
export default config;
