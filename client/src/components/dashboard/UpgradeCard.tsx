import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import {
  CheckCircleOutline as CheckIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/uiSlice';
import { AppDispatch } from '../../store';

const UpgradeCard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const handleUpgradeClick = () => {
    dispatch(
      openModal({
        type: 'SUBSCRIPTION_MODAL',
        props: {
          onSubscribe: (plan: string) => {
            console.log(`Subscribing to ${plan} plan`);
            // This would be handled by the subscription modal
          },
        },
      })
    );
  };

  const premiumFeatures = [
    'Unlimited resumes',
    'Advanced AI optimization',
    'All export formats',
    'Premium templates',
    'Priority support',
  ];

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.primary.main}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: theme.palette.secondary.main,
          color: 'white',
          px: 2,
          py: 0.5,
          borderBottomLeftRadius: 8,
          fontWeight: 'bold',
          fontSize: '0.75rem',
        }}
      >
        RECOMMENDED
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <StarIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
          <Typography variant="h6" component="h2">
            Upgrade to Premium
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" paragraph>
          Unlock all premium features and maximize your job search success:
        </Typography>
        <List dense disablePadding>
          {premiumFeatures.map((feature, index) => (
            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckIcon color="success" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            mt: 2,
            mb: 1,
          }}
        >
          <Typography variant="h4" component="span" fontWeight="bold">
            $9.99
          </Typography>
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            per month
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          Cancel anytime. No commitment required.
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleUpgradeClick}
        >
          Upgrade Now
        </Button>
        <Button
          component={RouterLink}
          to="/pricing"
          variant="text"
          fullWidth
          size="small"
          sx={{ mt: 1 }}
        >
          Learn More
        </Button>
      </Box>
    </Card>
  );
};

export default UpgradeCard;
