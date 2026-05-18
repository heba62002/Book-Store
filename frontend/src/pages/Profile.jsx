
import { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography,
  Alert, CircularProgress, Avatar, Divider
} from '@mui/material';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const taya = {
  textDark:   '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue:   '#e0f2f1',
  bgCream:    '#f9f7f2',
};

const Profile = () => {
  const { user, login } = useAuth();

  const [formData, setFormData]   = useState({ name: '', email: '', password: '' });
  const [success, setSuccess]     = useState('');
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const updateData = { name: formData.name, email: formData.email };
      if (formData.password) updateData.password = formData.password;

      const response = await axiosInstance.put('/user/profile', updateData);

      const updatedUser = response.data.user;
      const token = localStorage.getItem('token');
      login(updatedUser, token);

      setSuccess('Data updated successfully ✓');
      setFormData(prev => ({ ...prev, password: '' }));

    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: taya.bgCream,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          pt: '80px',
          pb: '60px',
          px: 2,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 520 }}>

        
          <Box
            sx={{
              bgcolor: taya.textDark,
              borderRadius: '20px',
              p: 4,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                fontSize: '1.8rem',
                fontWeight: 600,
                bgcolor: taya.accentBlue,
                color: taya.textDark,
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                variant="h5"
                sx={{ color: 'white', fontWeight: 300, letterSpacing: 1, mb: 0.5 }}
              >
                {user?.name}
              </Typography>
              <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>
                {user?.email}
              </Typography>
              <Typography
                sx={{
                  color: taya.accentBlue,
                  fontSize: '0.75rem',
                  mt: 0.5,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                {user?.role === 'admin' ? '👑 Admin' : 'Member'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: '20px',
              p: 4,
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}
          >
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: '1.4rem',
                color: taya.textDark,
                mb: 0.5,
              }}
            >
             Edit Data
            </Typography>

            <Divider sx={{ mb: 3, borderColor: '#eee' }} />

            {success && (
              <Alert
                severity="success"
                sx={{ mb: 2, borderRadius: '10px', bgcolor: taya.softBlue, color: taya.textDark, border: 'none' }}
              >
                {success}
              </Alert>
            )}
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 2, borderRadius: '10px' }}
              >
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                sx={inputStyle}
              />
              <TextField
                label="New Password(Optional)"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                helperText="Leave it blank if you don't want to change the password."
                sx={inputStyle}
              />

              <Button
                type="submit"
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  bgcolor: taya.textDark,
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#333',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': { bgcolor: '#ccc' },
                  transition: 'all 0.3s ease',
                }}
              >
                {isLoading
                  ? <CircularProgress size={24} sx={{ color: 'white' }} />
                  : 'Save Changes'}
              </Button>
            </Box>
          </Box>

        </Box>
      </Box>
    </Layout>
  );
};


const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#f9f7f2',
    '& fieldset':         { borderColor: '#eee' },
    '&:hover fieldset':   { borderColor: '#ccc' },
    '&.Mui-focused fieldset': { borderColor: '#a8dadc' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a8dadc' },
};

export default Profile;