import { Box } from '@mui/material';
import AuthAccesssModal from '../../modules/auth/components/auth-access-modal';

interface HeaderProps {
  minHeight: string;
}

const Header = ({ minHeight }: HeaderProps) => {
  return (
    <Box
      component="header"
      sx={{
        minHeight,
        background: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <AuthAccesssModal />
    </Box>
  );
};

export default Header;
