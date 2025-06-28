import { Box } from '@mui/material';

interface FooterProps {
  minHeight: string;
}

const Footer = ({ minHeight }: FooterProps) => {
  return (
    <Box
      component="footer"
      sx={{
        minHeight,
        background: 'secondary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <p style={{ margin: 0, color: 'white' }}>
        © 2025 CineXplore - Tu explorador de cine
      </p>
    </Box>
  );
};

export default Footer;
