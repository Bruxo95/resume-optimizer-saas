import React from 'react';
import {
  Box,
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tabs,
  Tab,
  Paper,
  Divider,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

interface ResumePreviewModalProps {
  resume: {
    _id: string;
    title: string;
    originalContent?: string;
    optimizedContent?: string;
    atsScore?: number;
    status: string;
  };
  onClose: () => void;
  onExport?: () => void;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  resume,
  onClose,
  onExport,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{resume.title}</Typography>
          {resume.atsScore !== undefined && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: getScoreColor(resume.atsScore),
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">ATS Score: {resume.atsScore}</Typography>
            </Box>
          )}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minHeight: '60vh' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="resume preview tabs"
          sx={{ mb: 2 }}
        >
          <Tab label="Optimized" disabled={!resume.optimizedContent} />
          <Tab label="Original" />
        </Tabs>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            minHeight: '50vh',
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            whiteSpace: 'pre-wrap',
          }}
        >
          {activeTab === 0 && resume.optimizedContent ? (
            <Typography variant="body1">{resume.optimizedContent}</Typography>
          ) : (
            <Typography variant="body1">{resume.originalContent}</Typography>
          )}
        </Paper>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          color="primary"
        >
          Print
        </Button>
        <Button
          startIcon={<ShareIcon />}
          onClick={() => {
            /* Share functionality would go here */
          }}
          color="primary"
        >
          Share
        </Button>
        <Button
          startIcon={<DownloadIcon />}
          onClick={onExport}
          color="primary"
          variant="contained"
          disabled={resume.status !== 'optimized' && resume.status !== 'exported'}
        >
          Export
        </Button>
      </DialogActions>
    </Box>
  );
};

// Helper function to get color based on score
const getScoreColor = (score: number): string => {
  if (score >= 80) return 'success.main';
  if (score >= 60) return 'info.main';
  if (score >= 40) return 'warning.main';
  return 'error.main';
};

export default ResumePreviewModal;
