
import { useState, useEffect } from 'react';
import {
  Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, Alert, CircularProgress,
  Box, Select, MenuItem, FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const taya = {
  textDark: '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue: '#e0f2f1',
  bgCream: '#f9f7f2',
};

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/admin/users');
        setUsers(res.data);
      } catch {
        setError('User loading failed');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

 

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed');
    }
  };

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh', bgcolor: taya.bgCream, px: '5%', py: '50px' }}>


        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: 300,
            color: taya.textDark,
            letterSpacing: 1,
            mb: 4,
          }}
        >
         Users Management
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: '10px' }}
          >
            {error}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: taya.accentBlue }} />
          </Box>
        )}

        {!loading && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Table>


              <TableHead>
                <TableRow sx={{ bgcolor: taya.textDark }}>
                  {['Name', 'Email','Role' ,'Creation Date', 'Delete'].map((col, i) => (
                    <TableCell
                      key={col}
                      align={i === 4 ? 'center' : 'left'}
                      sx={{
                        color: '#888',
                        fontWeight: 400,
                        fontSize: '0.85rem',
                        letterSpacing: 1,
                        borderBottom: `1px solid #2a2a2a`,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>


              <TableBody>
                {users.map((u, idx) => {
                  const isCurrentUser = u._id === currentUser.id;
                  return (
                    <TableRow
                      key={u._id}
                      hover
                      sx={{
                        bgcolor: isCurrentUser
                          ? taya.softBlue
                          : idx % 2 === 0 ? 'white' : taya.bgCream,
                        '&:hover': { bgcolor: taya.softBlue },
                        transition: 'background 0.2s ease',
                      }}
                    >
                      
                      <TableCell
                        sx={{ color: taya.textDark, fontWeight: isCurrentUser ? 600 : 400 }}
                      >
                        {u.name}
                      </TableCell>

                   
                      <TableCell sx={{ color: '#666', fontSize: '0.9rem' }}>
                        {u.email}
                      </TableCell>

                 
                      <TableCell>
                        {isCurrentUser ? (
                          <Chip
                            label="Admin (You)"
                            size="small"
                            sx={{
                              bgcolor: taya.accentBlue,
                              color: taya.textDark,
                              fontWeight: 600,
                              borderRadius: '50px',
                            }}
                          />
                        ) : (
                          <Chip
                            label={u.role === 'admin' ? 'Admin' : 'User'}
                            size="small"
                            sx={{
                              bgcolor: u.role === 'admin' ? taya.softBlue : '#f5f5f5', 
                              color: taya.textDark,
                              fontWeight: 500,
                              borderRadius: '50px',
                              border: '1px solid #eee',
                            }}
                          />
                        )}
                      </TableCell>
                     
                      <TableCell sx={{ color: '#888', fontSize: '0.85rem' }}>
                        {new Date(u.createdAt).toLocaleDateString('ar')}
                      </TableCell>

                 
                      <TableCell align="center">
                        <IconButton
                          disabled={isCurrentUser}
                          onClick={() => handleDelete(u._id)}
                          sx={{
                            color: isCurrentUser ? '#ccc' : '#e57373',
                            '&:hover': {
                              bgcolor: '#fff0f0',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Layout>
  );
};

export default ManageUsers;
