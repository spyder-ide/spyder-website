/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import { colors } from "./src/lib/utils/tailwindColors.js";

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        sans: ["silka", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        0: "0",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "16/10": "16 / 10",
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '23': 'repeat(23, minmax(0, 1fr))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              fontSize: "1rem",
              fontSize: "1.18rem",
              fontWeight: "400"
            },
            figure: {
              border: "1px solid",
              backgroundColor: "rgba(0, 0, 0, 0.01)",
              borderColor: "rgba(0, 0, 0, 0.03)",
              padding: "1em",
              borderRadius: "0.6em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            img: {
              boxShadow:
                "rgba(0, 0, 0, 0.04) 0px 0.5em 2em 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              borderRadius: "0.6em",
              marginLeft: "auto",
              marginRight: "auto"
            }
          },
        },
        lg: {
          css: {
            code: {
              fontSize: "1.18rem",
              fontWeight: "400"
            },
          }
        },
        md: {
          css: {
            figure: {
              padding: "2em 2em 1em 2em",
            }
          }
        },
        invert: {
          css: {
            figure: {
              backgroundColor: "rgba(255,255,255, 0.01)",
            },
          },
        },
      }),
      colors: {
        ...colors,
      },
    },
  },
};
