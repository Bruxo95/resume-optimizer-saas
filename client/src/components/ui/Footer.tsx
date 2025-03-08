import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resume Optimizer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered resume optimization platform that adapts to each country's
              specific CV standards.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="linkedin" color="primary">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="primary">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > a': { mb: 1 },
              }}
            >
              <MuiLink component={Link} to="/about" color="inherit">
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/features" color="inherit">
                Features
              </MuiLink>
              <MuiLink component={Link} to="/pricing" color="inherit">
                Pricing
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit">
                Contact
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > a': { mb: 1 },
              }}
            >
              <MuiLink component={Link} to="/blog" color="inherit">
                Blog
              </MuiLink>
              <MuiLink component={Link} to="/faq" color="inherit">
                FAQ
              </MuiLink>
              <MuiLink component={Link} to="/support" color="inherit">
                Support
              </MuiLink>
              <MuiLink component={Link} to="/tutorials" color="inherit">
                Tutorials
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > a': { mb: 1 },
              }}
            >
              <MuiLink component={Link} to="/privacy" color="inherit">
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/terms" color="inherit">
                Terms of Service
              </MuiLink>
              <MuiLink component={Link} to="/cookies" color="inherit">
                Cookie Policy
              </MuiLink>
              <MuiLink component={Link} to="/gdpr" color="inherit">
                GDPR
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {currentYear} Resume Optimizer. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
