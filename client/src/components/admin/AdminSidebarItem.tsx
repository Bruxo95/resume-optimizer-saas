import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AdminSidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const AdminSidebarItem: React.FC<AdminSidebarItemProps> = ({
  to,
  icon,
  text,
}) => {
  // Get sidebar state from Redux
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  return (
    <Tooltip title={sidebarOpen ? '' : text} placement="right" arrow>
      <ListItemButton
        component={NavLink}
        to={to}
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
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ opacity: sidebarOpen ? 1 : 0 }}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: 'medium',
          }}
        />
      </ListItemButton>
    </Tooltip>
  );
};

export default AdminSidebarItem;
