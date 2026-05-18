
import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const theme = {
  textDark: '#1a1a1a',
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: '60px',
        px: '10%',
        mt: 'auto',
        backgroundColor: theme.textDark,
        color: 'white',
      }}
    >
  
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          sx={{
            letterSpacing: '5px',
            fontWeight: 300,
            fontSize: '1.2rem',
            mb: 1,
          }}
        >
          TAYA BOOKS
        </Typography>
        <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>
         Sophistication in every chapter.
        </Typography>
      </Box>

    
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
        {[
          { label: 'Books',   to: '/'        },
          { label: 'Profile', to: '/profile' },
          { label: 'Support', to: '/contact' },
        ].map(link => (
          <MuiLink
            key={link.to}
            component={Link}
            to={link.to}
            underline="none"
            sx={{
              color: '#888',
              fontSize: '0.9rem',
              transition: 'color 0.3s',
              '&:hover': { color: 'white' },
            }}
          >
            {link.label}
          </MuiLink>
        ))}
      </Box>

     
      <Divider sx={{ borderColor: '#333', mb: 3 }} />
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: '#555', fontSize: '0.8rem' }}
      >
        © {new Date().getFullYear()}   TAYA Books  — All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;