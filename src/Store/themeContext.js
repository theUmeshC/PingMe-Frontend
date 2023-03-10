import { createTheme, ThemeProvider } from "@mui/material";
import { cyan, green, grey } from "@mui/material/colors";
import { createContext, useContext, useMemo, useState } from "react";

const colorModeContext = createContext();

export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  const colorMode = useMemo(
    () => ({
      toggleMode,
      mode,
    }),
    [mode]
  );

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            divider: cyan[900],
            background: {
              default: 'white',
              Paper: cyan[300],
              selected: cyan[200],
              hover: cyan[500],
              navBg: cyan[900],
            },
            text: {
              primary: "black",
              secondary: grey[900],
              tertiary: 'white',
              active: green['A100'],
            },
          }
        : {
            divider: "rgba(255, 255, 255, 0.12)",
            background: {
              default: "#121212",
              Paper: "#121212",
              selected: "rgba(255, 255, 255, 0.16)",
              hover: 'rgba(255, 255, 255, 0.08)',
              navBg: '#121212',
            },
            text: {
              primary: "#fff",
              secondary: "rgba(255, 255, 255, 0.3)",
              tertiary: '#fff',
              active: green['A700'],
            },
          }),
    },
  });
  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  );
};

export const ColorContext = () => useContext(colorModeContext);
