import React from 'react';
import {
  Box,
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribe: (plan: 'free' | 'premium') => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  onClose,
  onSubscribe,
}) => {
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const currentPlan = user?.subscription || 'free';

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      color: theme.palette.primary.main,
      features: [
        { text: 'Create up to 3 resumes', included: true },
        { text: 'Basic resume templates', included: true },
        { text: 'Export to PDF', included: true },
        { text: 'AI-powered suggestions', included: false },
        { text: 'ATS optimization', included: false },
        { text: 'Country-specific adaptations', included: false },
        { text: 'Premium templates', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      color: theme.palette.secondary.main,
      features: [
        { text: 'Unlimited resumes', included: true },
        { text: 'All templates (basic + premium)', included: true },
        { text: 'Export to PDF, DOCX, and TXT', included: true },
        { text: 'Advanced AI-powered suggestions', included: true },
        { text: 'ATS optimization', included: true },
        { text: 'Country-specific adaptations', included: true },
        { text: 'Premium templates', included: true },
        { text: 'Priority support', included: true },
      ],
    },
  ];

  return (
    <Box>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <StarIcon sx={{ mr: 1, color: 'secondary.main' }} />
          <Typography variant="h6">Subscription Plans</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Choose the plan that works best for you. Upgrade to Premium for
          advanced features and unlimited access.
        </Typography>

        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} key={plan.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: plan.id === currentPlan ? `2px solid ${plan.color}` : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {plan.id === currentPlan && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: -30,
                      transform: 'rotate(45deg)',
                      bgcolor: plan.color,
                      color: 'white',
                      py: 0.5,
                      px: 4,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    CURRENT
                  </Box>
                )}

                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ color: plan.color, fontWeight: 'bold' }}
                >
                  {plan.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h4" component="span" fontWeight="bold">
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    {plan.period}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List sx={{ flexGrow: 1 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {feature.included ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: feature.included ? 'textPrimary' : 'text.secondary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant={plan.id === 'premium' ? 'contained' : 'outlined'}
                  color={plan.id === 'premium' ? 'secondary' : 'primary'}
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={plan.id === currentPlan}
                  onClick={() => onSubscribe(plan.id as 'free' | 'premium')}
                >
                  {plan.id === currentPlan
                    ? 'Current Plan'
                    : plan.id === 'free'
                    ? 'Downgrade'
                    : 'Upgrade'}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Box>
  );
};

export default SubscriptionModal;
