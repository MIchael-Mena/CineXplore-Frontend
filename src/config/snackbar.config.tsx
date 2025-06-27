import { SnackbarProvider, closeSnackbar } from 'notistack';
import React from 'react';

type SnackbarConfigProps = {
  children: React.ReactNode;
};

export const SnackbarConfig: React.FC<SnackbarConfigProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={4000}
    >
      {children}
    </SnackbarProvider>
  );
};
