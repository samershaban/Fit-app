import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: '#64748b',
  textDecoration: 'none',
};

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, md: 4 },
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontWeight: 800, color: 'primary.main', fontSize: 15, letterSpacing: '-0.3px' }}>
        Fit App
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/routine" style={linkStyle}>Routine</NavLink>
      </Box>
    </Box>
  );
};
