
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar, Toolbar, Typography, Button,
  IconButton, Box, Avatar, Menu,
  MenuItem, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const taya = {
  textDark: '#1a1a1a',
  accentBlue: '#a8dadc',
  bgCream: '#f9f7f2',
};

const Navbar = ({ toggleSidebar }) => {
  const { user, isAuth, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: taya.textDark,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}
    >
      <Toolbar>


        <IconButton
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, color: taya.bgCream }}
        >
          <MenuIcon />
        </IconButton>


        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 300,
            letterSpacing: '3px',
          }}
        >
          TAYA BOOKS
        </Typography>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          {!isAuth ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: '#888',
                  fontWeight: 400,
                  '&:hover': { color: 'white' },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: '#555',
                  borderRadius: '50px',
                  px: 2.5,
                  fontWeight: 400,
                  '&:hover': {
                    borderColor: taya.accentBlue,
                    color: taya.accentBlue,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                New Account
              </Button>
            </>

          ) : (
            <>
              {isAdmin && (
                <Button
                  component={Link}
                  to="/dashboard"
                  sx={{
                    color: taya.accentBlue,
                    fontWeight: 500,
                    '&:hover': { color: 'white' },
                  }}
                >
                  Dashboard
                </Button>
              )}

            
              <IconButton onClick={handleAvatarClick} sx={{ p: 0, ml: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: isAdmin ? taya.accentBlue : '#444',
                    color: taya.textDark,
                    fontWeight: 600,
                    width: 36,
                    height: 36,
                    fontSize: '0.9rem',
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    bgcolor: 'white',
                    borderRadius: '16px',
                    minWidth: 200,
                    mt: 1.5,
                    border: '1px solid #eee',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                  },
                }}
              >

                <MenuItem disabled sx={{ opacity: '1 !important', py: 2 }}>
                  <Box>
                    <Typography fontWeight={400} letterSpacing={1} sx={{ color: 'white', fontSize: '0.95rem' }}>
                      {user?.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: taya.accentBlue, letterSpacing: 1 }}>
                      {user?.role === 'admin' ? '👑 ADMIN' : 'MEMBER'}
                    </Typography>
                  </Box>
                </MenuItem>

                <Divider sx={{ borderColor: '#eee', m: 0 }} />

                <Box sx={{ p: 1 }}>
                  <MenuItem
                    onClick={() => { handleMenuClose(); navigate('/profile'); }}
                    sx={{
                      borderRadius: '10px',
                      color: '#beb0b0',
                      fontSize: '0.9rem',
                      '&:hover': { bgcolor: taya.softBlue, color: taya.textDark },
                      transition: 'all 0.2s ease',
                    }}
                  >
                   My Profile
                  </MenuItem>

                  {isAdmin && (
                    <MenuItem
                      onClick={() => { handleMenuClose(); navigate('/dashboard'); }}
                      sx={{
                        borderRadius: '10px',
                        color: '#555',
                        fontSize: '0.9rem',
                        '&:hover': { bgcolor: taya.softBlue, color: taya.textDark },
                        transition: 'all 0.2s ease',
                      }}
                    >
                     Dashboard
                    </MenuItem>
                  )}
                </Box>

                <Divider sx={{ borderColor: '#eee', m: 0 }} />

                <Box sx={{ p: 1 }}>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      borderRadius: '10px',
                      color: '#e57373',
                      fontSize: '0.9rem',
                      '&:hover': { bgcolor: '#fff5f5' },
                      transition: 'all 0.2s ease',
                    }}
                  >
                   Logout
                  </MenuItem>
                </Box>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;