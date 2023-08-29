import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#202123",
    secondary: "#343440",
    tertiary: "#424552",
    quaternary: "#a9b1bb",
    white: "#ffffff",
    error: "red.500",
  },
  components: {
    Box: {
      baseStyle: {
        borderRadius: "md",
      },
    },
    Button: {
      variants: {
        "color-scheme": "teal",
      },
    },
    Text: {
      baseStyle: {
        color: "white",
      },
    },
    Textarea: {
      baseStyle: {
        size: "sm",
        resize: "none",
        rows: "6",
        border: "none",
        outline: "none",
        boxShadow: "none",
        overflow: "hidden",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      },
    },
  },
});

export default theme;