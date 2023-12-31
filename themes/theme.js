import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    base: "0px",
    sm: "480px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    "2xl": "1536px",
  },
  fonts: {
    body: "'Segoe UI', system-ui, sans-serif",
    heading: "'Segoe UI', system-ui, sans-serif",
  },
  colors: {
    primary: "#ffffff",
    secondary: "#002136",
    tertiary: "#f7fafc",
    quaternary: "#15b9fe",
    quinary: "#bbd5ec",
    senary: "#a0aec0",
    white: "#ffffff",
    error: "#b50d0d",
  },
  components: {
    Box: {
      baseStyle: {
        borderRadius: "md",
      },
    },
    Text: {
      baseStyle: {
        color: "#002136",
      },
    },
    Textarea: {
      baseStyle: {
        overflow: "hidden",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      },
    },
  },
});

export default theme;
