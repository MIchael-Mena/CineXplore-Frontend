import React from 'react';
import './App.css';
import { SnackbarConfig } from './config/snackbar.config';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/router';

function App() {
  return (
    <React.Fragment>
      <SnackbarConfig>
        <RouterProvider router={router} />
      </SnackbarConfig>
    </React.Fragment>
  );
}

export default App;
