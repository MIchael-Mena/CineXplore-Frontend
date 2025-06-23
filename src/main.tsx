import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './index.css';
import 'dayjs/locale/en';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // El strict mode ayuda a detectar problemas en la aplicacion en modo desarrollo
  <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <App />
      </LocalizationProvider>
  </React.StrictMode>
)
