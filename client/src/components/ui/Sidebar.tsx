import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as ResumeIcon,
  Add as AddIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  CreditCard as SubscriptionIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'My Resumes',
      icon: <ResumeIcon />,
      path: '/dashboard/resumes',
    },
    {
      text: 'Create Resume',
      icon: <AddIcon />,
      path: '/dashboard/resumes/create',
    },
    {
      text: 'Profile',
      icon: <ProfileIcon />,
      path: '/dashboard/profile',
    },
    {
      text: 'Subscription',
      icon: <SubscriptionIcon />,
      path: '/dashboard/subscription',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/dashboard/settings',
    },
    {
      text: 'Help & Support',
      icon: <HelpIcon />,
      path: '/dashboard/help',
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? drawerWidth : theme.spacing(7),
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : theme.spacing(7),
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ py: 2, px: sidebarOpen ? 2 : 0 }}>
        {sidebarOpen ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Resume Optimizer
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            RO
          </Typography>
        )}
      </Box>
      <Divider />
      <Box sx={{ mt: 2 }}>
        {sidebarOpen && (
          <Box sx={{ px: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {user?.subscription === 'premium' ? 'Premium User' : 'Free User'}
            </Typography>
            <Typography variant="body2" noWrap>
              {user?.name}
            </Typography>
          </Box>
        )}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&.active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: sidebarOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2, display: sidebarOpen ? 'block' : 'none' }}>
        <Typography variant="caption" color="text.secondary">
          {user?.subscription === 'premium'
            ? 'Premium subscription active'
            : 'Upgrade to Premium for more features'}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
