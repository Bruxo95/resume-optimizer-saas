import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Public as PublicIcon,
  Psychology as PsychologyIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <PsychologyIcon fontSize="large" color="primary" />,
      title: 'AI-Powered Optimization',
      description:
        'Our advanced AI analyzes your resume and suggests improvements based on industry standards and best practices.',
    },
    {
      icon: <PublicIcon fontSize="large" color="primary" />,
      title: 'Country-Specific Adaptation',
      description:
        'Automatically adapt your resume to meet the specific requirements and expectations of different countries.',
    },
    {
      icon: <SpeedIcon fontSize="large" color="primary" />,
      title: 'ATS Optimization',
      description:
        'Ensure your resume passes through Applicant Tracking Systems with optimized keywords and formatting.',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Secure Storage',
      description:
        'Your personal information is stored securely with enterprise-grade encryption and data protection.',
    },
    {
      icon: <DevicesIcon fontSize="large" color="primary" />,
      title: 'Multiple Export Formats',
      description:
        'Export your optimized resume in various formats including PDF, DOCX, and plain text.',
    },
    {
      icon: <TranslateIcon fontSize="large" color="primary" />,
      title: 'Multilingual Support',
      description:
        'Create and optimize resumes in multiple languages with our intelligent language detection.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      text: 'Resume Optimizer helped me tailor my CV for the German job market. I got three interview calls within a week!',
      image: '/images/testimonials/sarah.jpg',
    },
    {
      name: 'Michael Chen',
      position: 'Marketing Manager',
      company: 'Global Brands',
      text: 'The AI suggestions were spot on. My resume now highlights my achievements much more effectively.',
      image: '/images/testimonials/michael.jpg',
    },
    {
      name: 'Elena Rodriguez',
      position: 'Financial Analyst',
      company: 'Investment Partners',
      text: 'I was able to create country-specific versions of my resume for UK, US, and Spain. Incredibly useful tool!',
      image: '/images/testimonials/elena.jpg',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                gutterBottom
                fontWeight="bold"
              >
                Optimize Your Resume with AI
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Create country-specific, ATS-optimized resumes that stand out to
                recruiters and pass automated screening systems.
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mb: { xs: 4, md: 0 } }}
              >
                <Button
                  component={RouterLink}
                  to="/auth/register"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Get Started Free
                </Button>
                <Button
                  component={RouterLink}
                  to="/features"
                  variant="outlined"
                  size="large"
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-image.png"
                alt="Resume Optimization"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
          >
            Powerful Features
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            Our platform combines AI technology with country-specific expertise
            to create the perfect resume for your target job market.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                  elevation={2}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      align="center"
                      fontWeight="medium"
                    >
                      {feature.title}
                    </Typography>
                    <Typography align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            Our simple three-step process makes resume optimization quick and
            easy.
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h1"
                  component="div"
                  color="primary"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                >
                  1
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  Upload Your Resume
                </Typography>
                <Typography>
                  Upload your existing resume or create a new one using our
                  intuitive editor.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h1"
                  component="div"
                  color="primary"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                >
                  2
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  AI Optimization
                </Typography>
                <Typography>
                  Our AI analyzes your resume and suggests improvements based on
                  your target country and industry.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h1"
                  component="div"
                  color="primary"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                >
                  3
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  Export & Apply
                </Typography>
                <Typography>
                  Export your optimized resume in your preferred format and start
                  applying for jobs with confidence.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={RouterLink}
              to="/auth/register"
              variant="contained"
              size="large"
              color="primary"
            >
              Start Optimizing Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
          >
            Success Stories
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            See how Resume Optimizer has helped job seekers around the world
            land their dream jobs.
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  elevation={2}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontStyle: 'italic', mb: 3 }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          mr: 2,
                        }}
                        image={testimonial.image}
                        alt={testimonial.name}
                      />
                      <Box>
                        <Typography variant="subtitle1" component="div">
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {testimonial.position}, {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h2"
            variant="h3"
            gutterBottom
            fontWeight="bold"
          >
            Ready to Optimize Your Resume?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of job seekers who have improved their chances of
            landing interviews with our AI-powered platform.
          </Typography>
          <Button
            component={RouterLink}
            to="/auth/register"
            variant="contained"
            size="large"
            color="secondary"
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
