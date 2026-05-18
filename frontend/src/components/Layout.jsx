
import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <Navbar toggleSidebar={toggleSidebar} />

      <Box sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>

        <Sidebar open={sidebarOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 0,
            py: 0,
            transition: 'margin 0.3s ease',
          
            width: '100%', 
            minWidth: 0, 
            display: 'block' 
          }}
        >
          <Toolbar />
          {children}
        </Box>

      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;