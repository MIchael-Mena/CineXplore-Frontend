import { Box } from '@mui/material';
import Header from '../modules/core/components/Header';
import Footer from '../modules/core/components/Footer';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useEffect } from 'react';
import type { ApiResponse } from '../models/ApiResponse';
import { handleSnackbar } from '../utils/apiUtils';
import { useAppDispatch } from '../store/hooks';
import { authenticate } from '../store/actions/userActions';

const componentSizes = {
  header: '70px',
  main: 'calc(100vh - 140px)',
  footer: '70px',
};

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Si no tengo token, no hago nada
    if (localStorage.getItem('token') === null) return;
    dispatch(authenticate())
      .unwrap()
      .catch((res: ApiResponse<void>) => {
        handleSnackbar(res.message, 'error');
      });
  }, [dispatch]);

  return (
    <>
      <Header minHeight={componentSizes.header} />
      <Box
        component="main"
        sx={{
          position: 'relative',
          mt: 1,
          minHeight: componentSizes.main,
          display: 'flex',
        }}
      >
        <Outlet />
      </Box>
      <Footer minHeight={componentSizes.footer} />
      <ScrollRestoration
        // key={'scroll-restoration'}
        // Dejo de funcionar preventScrollReset en NavLink y en useNavigate
        getKey={(location) => {
          //https:reactrouter.com/en/6.15.0/components/scroll-restoration
          // Si no existe location.state o si existe y preventScrollReset es true, devuelvo null
          const key =
            location.state && !(location.state.preventScrollReset ?? true);
          return key ? null : location.pathname;
        }}
      />
    </>
  );
};

export default Layout;
