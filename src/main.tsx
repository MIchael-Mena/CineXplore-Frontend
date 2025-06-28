import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeConfig } from './styles/theme.config.tsx';
import { Provider } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './index.css';
import 'dayjs/locale/en';
import { ApiService } from './services/api.service';
import { store } from './store/store.ts';

ApiService.initialize(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeConfig>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <App />
      </LocalizationProvider>
    </ThemeConfig>
  </Provider>
);
