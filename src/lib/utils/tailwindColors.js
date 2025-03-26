export const colors = {
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
};

/**
 * Get a specific Tailwind color with shade
 * @param {string} colorName - Color name in kebab-case (e.g., 'mine-shaft')
 * @param {number|string} shade - Color shade (e.g., 100, 200, etc.)
 * @returns {string} The color hex value or empty string if not found
 */
export const getColor = (colorName, shade) => {
  // Get the color object
  const colorObj = colors[colorName];
  
  if (!colorObj) {
    console.warn(`Color "${colorName}" not found in Tailwind colors`);
    return '';
  }
  
  return colorObj[shade] || '';
}; 

/**
 * Pre-defined color combinations for common UI components
 * Each scheme provides light and dark mode variations
 */
export const colorSchemes = {
  // Chart color schemes
  chart: {
    springWood: {
      light: [colors["spring-wood"][300], colors["spring-wood"][200]],
      dark: [colors["spring-wood"][800], colors["spring-wood"][900]]
    },
    quillGray: {
      light: [colors["quill-gray"][300], colors["quill-gray"][200]],
      dark: [colors["quill-gray"][800], colors["quill-gray"][900]]
    },
    mineShaft: {
      light: [colors["mine-shaft"][200], colors["mine-shaft"][100]],
      dark: [colors["mine-shaft"][700], colors["mine-shaft"][600]]
    },
    outerSpace: {
      light: [colors["outer-space"][300], colors["outer-space"][200]],
      dark: [colors["outer-space"][700], colors["outer-space"][800]]
    }
  },
  
  // Button color schemes
  button: {
    primary: {
      background: colors["red-berry"][600],
      hoverBackground: colors["red-berry"][700],
      text: "#ffffff"
    },
    secondary: {
      background: colors["mine-shaft"][200],
      hoverBackground: colors["mine-shaft"][300],
      text: colors["mine-shaft"][800]
    }
  },
  
  // Text color schemes
  text: {
    light: {
      primary: colors["mine-shaft"][900],
      secondary: colors["mine-shaft"][700],
      muted: colors["mine-shaft"][500]
    },
    dark: {
      primary: colors["quill-gray"][100],
      secondary: colors["quill-gray"][300],
      muted: colors["quill-gray"][500]
    }
  }
}; 
