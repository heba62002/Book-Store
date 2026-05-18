
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Drawer, List, ListItem, ListItemIcon,
  ListItemText, Toolbar, Divider, ListItemButton
} from '@mui/material';
import HomeIcon      from '@mui/icons-material/Home';
import PersonIcon    from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon  from '@mui/icons-material/MenuBook';
import PeopleIcon    from '@mui/icons-material/People';

const DRAWER_WIDTH = 240;

const taya = {
  textDark:   '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue:   '#e0f2f1',
  bgCream:    '#f9f7f2',
};

const Sidebar = ({ open }) => {
  const { isAuth, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'Home',         icon: <HomeIcon />,      to: '/',             always: true },
    { label: 'My Profile',      icon: <PersonIcon />,    to: '/profile',      show: isAuth  },
    { label: 'Dashboard',      icon: <DashboardIcon />, to: '/dashboard',    show: isAdmin },
    { label: 'Book Management',      icon: <MenuBookIcon />,  to: '/manage/books', show: isAdmin },
    { label: 'Users Management', icon: <PeopleIcon />,    to: '/manage/users', show: isAdmin },
  ];

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: taya.textDark,   
          borderRight: 'none',
        },
      }}
    >
      <Toolbar />

      <List sx={{ px: 1 }}>
        {navLinks
          .filter(link => link.always || link.show)
          .map(link => {
            const isActive = location.pathname === link.to;
            return (
              <ListItem key={link.to} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={link.to}
                  selected={isActive}
                  sx={{
                    borderRadius: '10px',
                    color: isActive ? taya.textDark : '#888',
                    backgroundColor: isActive ? taya.accentBlue : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive ? taya.accentBlue : '#2a2a2a',
                      color: 'white',
                    },
                   
                    '&.Mui-selected': {
                      backgroundColor: taya.accentBlue,
                      color: taya.textDark,
                      '&:hover': { backgroundColor: taya.accentBlue },
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? taya.textDark : '#555',
                      minWidth: 40,
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>

      <Divider sx={{ borderColor: '#333', mt: 'auto' }} />
    </Drawer>
  );
};

export default Sidebar;