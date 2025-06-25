import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

type ThemeProp = {
  children: React.ReactNode;
};

const defaultTheme = createTheme();
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0f23',
      paper: '#1a1a2e',
    },
    primary: {
      main: '#ff6b35',
      light: '#ff8c42',
      dark: '#e55100',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00d4ff',
      light: '#33ddff',
      dark: '#0099cc',
      contrastText: '#000000',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      disabled: '#666666',
    },
    divider: '#333333',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '0em',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '0em',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0em',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.03em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiFab: {
      defaultProps: {
        style: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
            boxShadow: '0 6px 25px rgba(255, 107, 53, 0.6)',
            transform: 'scale(1.05)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'extended' },
          style: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      ],
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        filledSuccess: {
          background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
        },
        filledError: {
          background: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)',
        },
        filledWarning: {
          background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
        },
        filledInfo: {
          background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [defaultTheme.breakpoints.up('md')]: {
            paddingInline: defaultTheme.spacing(6),
          },
          [defaultTheme.breakpoints.up('lg')]: {
            paddingInline: defaultTheme.spacing(8),
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: '#00d4ff',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: '#33ddff',
            textShadow: '0 0 8px rgba(0, 212, 255, 0.5)',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        style: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus': {
            outline: '2px solid rgba(255, 107, 53, 0.5)',
            outlineOffset: '2px',
          },
        },
      },
      variants: [
        {
          props: { variant: 'text' },
          style: {
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              transform: 'translateY(-2px)',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
              boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderColor: '#ff6b35',
            color: '#ff6b35',
            '&:hover': {
              borderColor: '#ff8c42',
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              transform: 'translateY(-2px)',
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 0 2px rgba(255, 107, 53, 0.2)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
