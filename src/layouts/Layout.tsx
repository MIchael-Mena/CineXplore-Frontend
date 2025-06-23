import { Box } from '@mui/material';
import Header from '@components/core/header'
import Footer from '@components/core/footer'
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useEffect } from 'react';
// import {useLogin} from "@hooks/useAuth";

const componentSizes = {
  header: '70px',
  main: 'calc(100vh - 140px)',
  footer: '70px',
};

const Layout = () => {

  useEffect(() => {
  }, []);

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
        getKey={(location, _matches) => {
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