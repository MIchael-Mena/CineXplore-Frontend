import { useState } from 'react';
import Box from '@mui/material/Box'; // Importa el componente Box de Material UI
import { Theme, useMediaQuery } from '@mui/material';

interface HeaderProps {
  minHeight: string;
}

const Header = ({ minHeight }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box component="header">

      </Box>
    </>
  );
};

export default Header;
