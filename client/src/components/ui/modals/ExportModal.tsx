import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Description as DocxIcon,
  TextSnippet as TxtIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface ExportModalProps {
  resumeId: string;
  title: string;
  onClose: () => void;
  onExport: (format: string, template: string, filename: string) => Promise<void>;
}

const ExportModal: React.FC<ExportModalProps> = ({
  resumeId,
  title,
  onClose,
  onExport,
}) => {
  const [format, setFormat] = useState('pdf');
  const [template, setTemplate] = useState('modern');
  const [filename, setFilename] = useState(title || 'resume');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await onExport(format, template, filename);
      onClose();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional design' },
    { id: 'classic', name: 'Classic', description: 'Traditional resume format' },
    { id: 'creative', name: 'Creative', description: 'Stand out with a unique design' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and straightforward' },
  ];

  return (
    <Box>
      <DialogTitle>Export Resume</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Choose your preferred export format and template.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Export Format
            </Typography>
            <RadioGroup
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              name="export-format"
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  border: format === 'pdf' ? '2px solid' : '1px solid',
                  borderColor: format === 'pdf' ? 'primary.main' : 'divider',
                }}
              >
                <FormControlLabel
                  value="pdf"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PdfIcon color="error" sx={{ mr: 1 }} />
                      <Typography>PDF Format</Typography>
                    </Box>
                  }
                  sx={{ flex: 1, m: 0 }}
                />
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  border: format === 'docx' ? '2px solid' : '1px solid',
                  borderColor: format === 'docx' ? 'primary.main' : 'divider',
                }}
              >
                <FormControlLabel
                  value="docx"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DocxIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Word Document (DOCX)</Typography>
                    </Box>
                  }
                  sx={{ flex: 1, m: 0 }}
                />
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  border: format === 'txt' ? '2px solid' : '1px solid',
                  borderColor: format === 'txt' ? 'primary.main' : 'divider',
                }}
              >
                <FormControlLabel
                  value="txt"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TxtIcon color="action" sx={{ mr: 1 }} />
                      <Typography>Plain Text (TXT)</Typography>
                    </Box>
                  }
                  sx={{ flex: 1, m: 0 }}
                />
              </Paper>
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Template
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="template-select-label">Template</InputLabel>
              <Select
                labelId="template-select-label"
                id="template-select"
                value={template}
                label="Template"
                onChange={(e) => setTemplate(e.target.value)}
                disabled={format === 'txt'}
              >
                {templates.map((tmpl) => (
                  <MenuItem key={tmpl.id} value={tmpl.id}>
                    {tmpl.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle1" gutterBottom>
              Filename
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter filename"
              InputProps={{
                endAdornment: <Typography>.{format}</Typography>,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleExport}
          color="primary"
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <DownloadIcon />}
          disabled={loading || !filename.trim()}
        >
          {loading ? 'Exporting...' : 'Export'}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ExportModal;
