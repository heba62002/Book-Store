
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography,
  Box, Button, CircularProgress
} from '@mui/material';
import PeopleIcon   from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Layout from '../../components/Layout';
import axiosInstance from '../../utils/axiosInstance';

const taya = {
  textDark:   '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue:   '#e0f2f1',
  bgCream:    '#f9f7f2',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats]     = useState({ users: 0, books: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, booksRes] = await Promise.all([
          axiosInstance.get('/admin/users'),
          axiosInstance.get('/books')
        ]);
        setStats({
          users: usersRes.data.length,
          books: booksRes.data.length
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label:    'Total users',
      value:    stats.users,
      icon:     <PeopleIcon   sx={{ fontSize: 48, color: taya.accentBlue }} />,
      action:   () => navigate('/manage/users'),
      btnLabel: 'User Management',
      blue:     false,
    },
    {
      label:    'Total Books',
      value:    stats.books,
      icon:     <MenuBookIcon sx={{ fontSize: 48, color: taya.textDark }} />,
      action:   () => navigate('/manage/books'),
      btnLabel: 'Books Management',
      blue:     true,
    },
  ];

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh', bgcolor: taya.bgCream, px: '5%', py: '50px' }}>

    
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: 300,
            color: taya.textDark,
            letterSpacing: 1,
            mb: 6,
          }}
        >
         Dashboard
        </Typography>

     
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: taya.accentBlue }} />
          </Box>

        ) : (
          <Grid container spacing={3}>
            {statCards.map(card => (
              <Grid item xs={12} sm={6} key={card.label}>
                <Card
                  sx={{
                    borderRadius: '20px',
                    bgcolor: card.blue ? taya.softBlue : 'white',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 5, textAlign: 'center' }}>

                 
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: card.blue ? 'white' : taya.softBlue,
                        mb: 3,
                      }}
                    >
                      {card.icon}
                    </Box>

                
                    <Typography
                      sx={{
                        fontSize: '3.5rem',
                        fontWeight: 300,
                        color: taya.textDark,
                        lineHeight: 1,
                        mb: 1,
                      }}
                    >
                      {card.value}
                    </Typography>

               
                    <Typography
                      sx={{
                        color: '#888',
                        fontSize: '0.95rem',
                        letterSpacing: 1,
                        mb: 4,
                      }}
                    >
                      {card.label}
                    </Typography>

                 
                    <Button
                      onClick={card.action}
                      sx={{
                        bgcolor: taya.textDark,
                        color: 'white',
                        borderRadius: '50px',
                        px: 4,
                        py: 1,
                        fontWeight: 400,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          bgcolor: '#333',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {card.btnLabel}
                    </Button>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

      </Box>
    </Layout>
  );
};

export default Dashboard;