/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

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
        "spring-wood": {
          50: "#f7f7f2",
          100: "#efefe5",
          200: "#dedeca",
          300: "#c9c8a8",
          400: "#b2ad85",
          500: "#a39b6c",
          600: "#958a61",
          700: "#7d7251",
          800: "#665c46",
          900: "#544d3a",
          950: "#2c271e",
        },
        "quill-gray": {
          50: "#f7f7f5",
          100: "#ecebe8",
          200: "#d9d8d2",
          300: "#bebdb3",
          400: "#a4a093",
          500: "#918c7e",
          600: "#857e71",
          700: "#6f695f",
          800: "#5c5750",
          900: "#4c4842",
          950: "#282622",
        },
        "mine-shaft": {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#303030",
        },
        "outer-space": {
          50: "#f2f9f9",
          100: "#deeeef",
          200: "#c0dde1",
          300: "#94c4cc",
          400: "#61a3af",
          500: "#468794",
          600: "#3d6f7d",
          700: "#365c68",
          800: "#334e57",
          900: "#2a3d45",
          950: "#1b2a31",
        },
        "red-berry": {
          50: "#ffeeee",
          100: "#ffdada",
          200: "#ffbbbb",
          300: "#ff8b8b",
          400: "#ff4949",
          500: "#ff1111",
          600: "#ff0000",
          700: "#e70000",
          800: "#be0000",
          900: "#8c0000",
          950: "#560000",
        },
      },
    },
  },
};
