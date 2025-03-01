import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  Divider,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Meal Planner', icon: <RestaurantMenuIcon />, path: '/meal-planner' },
    { text: 'Food Database', icon: <KitchenIcon />, path: '/food-database' },
    { text: 'Herb Dictionary', icon: <LocalHospitalIcon />, path: '/herbs' },
    { text: 'Progress Tracking', icon: <MonitorWeightIcon />, path: '/tracking' },
    { text: 'Community', icon: <PeopleIcon />, path: '/community' }
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const getPageTitle = () => {
    const item = menuItems.find(item => item.path === location.pathname);
    return item ? item.text : 'Blood Type Diet';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
                {user.name}
              </Typography>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user.name.charAt(0)}
              </Avatar>
            </Box>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="primary">
              Blood Type Diet
            </Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {user && (
            <List>
              <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Blood Type Diet Tracker
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}; 