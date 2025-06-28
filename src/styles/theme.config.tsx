import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

type ThemeProp = {
  children: React.ReactNode;
};

const theme = createTheme();

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
