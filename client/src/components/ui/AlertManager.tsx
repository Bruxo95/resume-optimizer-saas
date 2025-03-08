import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Snackbar, Stack } from '@mui/material';
import { RootState } from '../../store';
import { removeAlert } from '../../store/slices/uiSlice';

const AlertManager: React.FC = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state: RootState) => state.ui);

  const handleClose = (id: string) => {
    dispatch(removeAlert(id));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
        maxWidth: '90%',
        width: 400,
      }}
    >
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={alert.timeout || 6000}
          onClose={() => handleClose(alert.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => handleClose(alert.id)}
            severity={alert.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default AlertManager;
