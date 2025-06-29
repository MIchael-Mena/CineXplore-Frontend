import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthAccesssModal from '../modules/auth/components/auth-access-modal';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container disableGutters maxWidth="lg">
      <p style={{ color: 'white' }}>Página Home funcionando con Material-UI</p>
      <Button
        variant="contained"
        color="primary"
        sx={{ my: 2 }}
        fullWidth
        onClick={() =>
          navigate('/movies', { state: { preventScrollReset: false } })
        }
      >
        View More
      </Button>
      <AuthAccesssModal />
    </Container>
  );
};

export default HomePage;
