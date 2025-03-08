import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  ContentCopy as DuplicateIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { openModal } from '../../store/slices/uiSlice';
import { deleteResume } from '../../store/slices/resumeSlice';

interface Resume {
  _id: string;
  title: string;
  country: string;
  language: string;
  status: string;
  atsScore?: number;
  updatedAt: string;
  template: string;
}

interface ResumeCardProps {
  resume: Resume;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleMenuClose();
    
    dispatch(
      openModal({
        type: 'CONFIRM_MODAL',
        props: {
          title: 'Delete Resume',
          message: `Are you sure you want to delete "${resume.title}"? This action cannot be undone.`,
          confirmText: 'Delete',
          cancelText: 'Cancel',
          severity: 'error',
          onConfirm: () => {
            dispatch(deleteResume(resume._id));
          },
        },
      })
    );
  };

  const handlePreview = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleMenuClose();
    
    dispatch(
      openModal({
        type: 'RESUME_PREVIEW_MODAL',
        props: {
          resume,
          onExport: () => {
            dispatch(
              openModal({
                type: 'EXPORT_MODAL',
                props: {
                  resumeId: resume._id,
                  title: resume.title,
                  onExport: async (format: string, template: string, filename: string) => {
                    console.log(`Exporting ${resume.title} as ${format} with template ${template} and filename ${filename}`);
                    // This would be handled by the export modal
                  },
                },
              })
            );
          },
        },
      })
    );
  };

  const getStatusColor = () => {
    switch (resume.status) {
      case 'draft':
        return theme.palette.info.main;
      case 'optimizing':
        return theme.palette.warning.main;
      case 'optimized':
        return theme.palette.success.main;
      case 'exported':
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusText = () => {
    switch (resume.status) {
      case 'draft':
        return 'Draft';
      case 'optimizing':
        return 'Optimizing';
      case 'optimized':
        return 'Optimized';
      case 'exported':
        return 'Exported';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/dashboard/resumes/${resume._id}`}
        sx={{ flexGrow: 1 }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              noWrap
              sx={{
                fontWeight: 'medium',
                maxWidth: 'calc(100% - 40px)',
              }}
            >
              {resume.title}
            </Typography>
            <Tooltip title="Options">
              <IconButton
                aria-label="more"
                aria-controls="resume-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Chip
            label={getStatusText()}
            size="small"
            sx={{
              bgcolor: `${getStatusColor()}20`,
              color: getStatusColor(),
              fontWeight: 'medium',
              mb: 1,
            }}
          />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Last updated: {formatDate(resume.updatedAt)}
          </Typography>

          {resume.atsScore !== undefined && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 1,
              }}
            >
              <Typography variant="body2" component="span">
                ATS Score:
              </Typography>
              <Box
                sx={{
                  ml: 1,
                  height: 8,
                  width: 80,
                  bgcolor: 'grey.300',
                  borderRadius: 4,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${resume.atsScore}%`,
                    bgcolor: getScoreColor(resume.atsScore),
                    borderRadius: 4,
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                component="span"
                sx={{ ml: 1, fontWeight: 'medium' }}
              >
                {resume.atsScore}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              component={RouterLink}
              to={`/dashboard/resumes/${resume._id}/edit`}
              size="small"
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Preview">
            <IconButton size="small" color="info" onClick={handlePreview}>
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Chip
            label={resume.country.toUpperCase()}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardActions>

      <Menu
        id="resume-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          component={RouterLink}
          to={`/dashboard/resumes/${resume._id}/edit`}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePreview}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Preview</ListItemText>
        </MenuItem>
        {(resume.status === 'optimized' || resume.status === 'exported') && (
          <MenuItem
            component={RouterLink}
            to={`/dashboard/resumes/${resume._id}/export`}
          >
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export</ListItemText>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

// Helper function to get color based on score
const getScoreColor = (score: number): string => {
  if (score >= 80) return '#4caf50'; // success
  if (score >= 60) return '#2196f3'; // info
  if (score >= 40) return '#ff9800'; // warning
  return '#f44336'; // error
};

export default ResumeCard;
