import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent } from '@mui/material';
import { RootState } from '../../store';
import { closeModal } from '../../store/slices/uiSlice';

// Import modal components
import ConfirmModal from './modals/ConfirmModal';
import ResumePreviewModal from './modals/ResumePreviewModal';
import SubscriptionModal from './modals/SubscriptionModal';
import ExportModal from './modals/ExportModal';

// Modal component map
const MODAL_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  CONFIRM_MODAL: ConfirmModal,
  RESUME_PREVIEW_MODAL: ResumePreviewModal,
  SUBSCRIPTION_MODAL: SubscriptionModal,
  EXPORT_MODAL: ExportModal,
};

const ModalManager: React.FC = () => {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: RootState) => state.ui);

  if (modals.length === 0) {
    return null;
  }

  // Get the last modal in the stack
  const currentModal = modals[modals.length - 1];
  const ModalComponent = MODAL_COMPONENTS[currentModal.type];

  if (!ModalComponent) {
    console.error(`Modal type ${currentModal.type} not found`);
    return null;
  }

  const handleClose = () => {
    dispatch(closeModal(currentModal.id));
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-title"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <ModalComponent
          {...currentModal.props}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalManager;
