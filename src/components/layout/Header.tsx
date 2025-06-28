import { Box } from '@mui/material';

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
        padding: 2,
      }}
    >
      <h2 style={{ margin: 0, color: 'white' }}>CineXplore Header</h2>
    </Box>
  );
};

export default Header;
