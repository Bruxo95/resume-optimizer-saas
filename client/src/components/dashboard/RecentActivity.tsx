import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Chip,
  Link,
  useTheme,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface Resume {
  _id: string;
  title: string;
  status: string;
  updatedAt: string;
}

interface RecentActivityProps {
  resumes: Resume[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ resumes }) => {
  const theme = useTheme();

  // Helper function to get activity details based on resume status
  const getActivityDetails = (resume: Resume) => {
    const date = new Date(resume.updatedAt).toLocaleDateString();
    const time = new Date(resume.updatedAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    switch (resume.status) {
      case 'draft':
        return {
          action: 'Created',
          icon: <DescriptionIcon />,
          color: theme.palette.info.main,
          time: `${date} at ${time}`,
        };
      case 'optimizing':
        return {
          action: 'Optimizing',
          icon: <EditIcon />,
          color: theme.palette.warning.main,
          time: `${date} at ${time}`,
        };
      case 'optimized':
        return {
          action: 'Optimized',
          icon: <ViewIcon />,
          color: theme.palette.success.main,
          time: `${date} at ${time}`,
        };
      case 'exported':
        return {
          action: 'Exported',
          icon: <DownloadIcon />,
          color: theme.palette.secondary.main,
          time: `${date} at ${time}`,
        };
      default:
        return {
          action: 'Updated',
          icon: <UploadIcon />,
          color: theme.palette.primary.main,
          time: `${date} at ${time}`,
        };
    }
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
      {resumes.length > 0 ? (
        resumes.map((resume, index) => {
          const activity = getActivityDetails(resume);
          return (
            <React.Fragment key={resume._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: activity.color }}>
                    {activity.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Link
                        component={RouterLink}
                        to={`/dashboard/resumes/${resume._id}`}
                        color="inherit"
                        underline="hover"
                        sx={{ fontWeight: 'medium' }}
                      >
                        {resume.title}
                      </Link>
                      <Chip
                        label={activity.action}
                        size="small"
                        sx={{
                          ml: 1,
                          bgcolor: `${activity.color}20`,
                          color: activity.color,
                          fontWeight: 'medium',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {activity.action} resume
                      </Typography>
                      {' — '}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {activity.time}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < resumes.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No recent activity
          </Typography>
        </Box>
      )}
    </List>
  );
};

export default RecentActivity;
