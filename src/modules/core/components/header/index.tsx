import Box from '@mui/material/Box'; // Importa el componente Box de Material UI

interface HeaderProps {
  minHeight: string;
}

const Header = ({ minHeight }: HeaderProps) => {

  return (
    <>
      <Box component="header" minHeight={minHeight}>
      </Box>
    </>
  );
};

export default Header;
