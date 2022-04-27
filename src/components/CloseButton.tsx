import React from 'react';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { DialogWindowProps } from './DialogWindow';

export function CloseButton({ handleClose }: DialogWindowProps) {
  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
        cursor: 'pointer',
        color: 'var(--subPrimary)',
      }}
      onClick={() => handleClose()}
      color="primary"
    >
      <CancelIcon
        id="modal-button-close"
        fontSize="large"
        sx={{
          backgroundColor: 'white',
          borderRadius: '100%',
        }}
      />
    </IconButton>
  );
}
