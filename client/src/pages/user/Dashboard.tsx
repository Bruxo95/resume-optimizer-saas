import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  Public as PublicIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { AppDispatch, RootState } from '../../store';
import { getResumes } from '../../store/slices/resumeSlice';
import { getCountries } from '../../store/slices/countrySlice';
import ResumeCard from '../../components/resume/ResumeCard';
import CountrySelector from '../../components/resume/CountrySelector';
import StatsCard from '../../components/dashboard/StatsCard';
import UpgradeCard from '../../components/dashboard/UpgradeCard';
import RecentActivity from '../../components/dashboard/RecentActivity';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { resumes, loading: resumesLoading } = useSelector(
    (state: RootState) => state.resume
  );
  const { countries, loading: countriesLoading } = useSelector(
    (state: RootState) => state.country
  );

  useEffect(() => {
    dispatch(getResumes());
    dispatch(getCountries());
  }, [dispatch]);

  const recentResumes = resumes.slice(0, 3);
  const isPremium = user?.subscription === 'premium';
  const resumeCount = resumes.length;
  const optimizedCount = resumes.filter(
    (resume) => resume.status === 'optimized' || resume.status === 'exported'
  ).length;
  const exportedCount = resumes.filter(
    (resume) => resume.status === 'exported'
  ).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography color="textSecondary">
          Welcome back, {user?.name}! Here's an overview of your resume
          optimization progress.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Resumes"
            value={resumeCount}
            icon={<DescriptionIcon fontSize="large" color="primary" />}
            description={`You have created ${resumeCount} ${
              resumeCount === 1 ? 'resume' : 'resumes'
            }`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Optimized"
            value={optimizedCount}
            icon={<TrendingUpIcon fontSize="large" color="success" />}
            description={`${optimizedCount} ${
              optimizedCount === 1 ? 'resume has' : 'resumes have'
            } been optimized`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Exported"
            value={exportedCount}
            icon={<PublicIcon fontSize="large" color="info" />}
            description={`${exportedCount} ${
              exportedCount === 1 ? 'resume has' : 'resumes have'
            } been exported`}
          />
        </Grid>

        {/* Recent Resumes */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h2">
                Recent Resumes
              </Typography>
              <Button
                component={RouterLink}
                to="/dashboard/resumes"
                size="small"
                color="primary"
              >
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {resumesLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : recentResumes.length > 0 ? (
              <Grid container spacing={2}>
                {recentResumes.map((resume) => (
                  <Grid item xs={12} sm={6} md={4} key={resume._id}>
                    <ResumeCard resume={resume} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  textAlign: 'center',
                }}
              >
                <DescriptionIcon
                  sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  No resumes yet
                </Typography>
                <Typography color="textSecondary" paragraph>
                  Create your first resume to get started
                </Typography>
                <Button
                  component={RouterLink}
                  to="/dashboard/resumes/create"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Create Resume
                </Button>
              </Box>
            )}

            {recentResumes.length > 0 && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/dashboard/resumes/create"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Create New Resume
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Subscription Status / Upgrade Card */}
        <Grid item xs={12} md={4}>
          {isPremium ? (
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'primary.dark',
                color: 'white',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <StarIcon sx={{ mr: 1, color: 'gold' }} />
                <Typography variant="h6" component="h2">
                  Premium Subscription
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" paragraph>
                  You're enjoying all premium features:
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="Unlimited Resumes"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="Advanced AI Optimization"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="All Export Formats"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="Premium Templates"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      }}
                    />
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Your subscription renews on{' '}
                  {new Date(user?.subscriptionExpiry || '').toLocaleDateString()}
                </Typography>
              </Box>
            </Paper>
          ) : (
            <UpgradeCard />
          )}
        </Grid>

        {/* Country Selector */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Target Countries
            </Typography>
            <Typography color="textSecondary" paragraph>
              Select a country to see its specific resume standards
            </Typography>
            {countriesLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <CountrySelector countries={countries} />
            )}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Recent Activity
            </Typography>
            <RecentActivity resumes={resumes.slice(0, 5)} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
