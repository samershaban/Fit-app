import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:    { main: '#3b82f6' },
    success:    { main: '#10b981' },
    warning:    { main: '#f59e0b' },
    background: { default: '#f1f5f9', paper: '#ffffff' },
    text:       { primary: '#0f172a', secondary: '#64748b' },
    divider:    '#e2e8f0',
  },
  shape: { borderRadius: 8 },
  typography: {
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: '1px solid #e2e8f0', borderRadius: 14 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
  },
});

export default theme;
