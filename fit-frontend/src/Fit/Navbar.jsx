import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const navLinkStyle = {
  padding: '6px 13px',
  borderRadius: 7,
  fontSize: 13,
  fontWeight: 500,
  color: '#64748b',
  textDecoration: 'none',
  display: 'inline-block',
};

const activeLinkStyle = {
  background: '#eff6ff',
  color: '#3b82f6',
  fontWeight: 600,
};

export const Navbar = () => {
  const { isAuthenticated, logout: auth0Logout, user } = useAuth0();

  const handleLogout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const initial = user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <Toolbar sx={{ gap: 0.5, minHeight: 56 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: '-0.5px', mr: 3 }}
        >
          Fit App
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
          {isAuthenticated && (
            <NavLink to="/dashboard" style={navLinkStyle} activeStyle={activeLinkStyle}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/routine" style={navLinkStyle} activeStyle={activeLinkStyle}>
            Routine
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/calendar" style={navLinkStyle} activeStyle={activeLinkStyle}>
                Calendar
              </NavLink>
              <NavLink to="/account" style={navLinkStyle} activeStyle={activeLinkStyle}>
                Account
              </NavLink>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {isAuthenticated && (
            <Box sx={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 13, fontWeight: 700,
            }}>
              {initial}
            </Box>
          )}
          {!isAuthenticated ? (
            <Button variant="outlined" size="small" component={NavLink} to="/login">
              Sign in
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{ color: 'text.secondary', borderColor: 'divider' }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
