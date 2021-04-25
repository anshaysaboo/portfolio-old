const { colors, fonts } = require("../../config")

export const sharedPreferences = {
  fonts: fonts,
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
  },
  borderRadius: "0.7rem", // Previously - 1rem
  pageWidth: "75rem", // Previously 62.5rem
  headerHeight: "6.25rem",
  footerHeight: "7.5rem",
}

export const lightTheme = {
  ...sharedPreferences,
  colors: colors.lightTheme,
}

export const darkTheme = {
  ...sharedPreferences,
  colors: colors.darkTheme,
}
