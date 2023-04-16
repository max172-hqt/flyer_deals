import { extendTheme } from 'native-base';

export const themeColor = '#F05D5E';
export const secondaryColor = '#F9E9EC';
export const lightGray = '#FCFCFC';
export const lightYellow = '#F4F0D4';

export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      300: themeColor,
      400: themeColor,
      500: themeColor,
      600: themeColor,
      700: themeColor,
      800: "#CB4F50",
    },
  },
});
