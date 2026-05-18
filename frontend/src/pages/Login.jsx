
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import {
  Box, Button, TextField,
  Typography, Alert, CircularProgress
} from '@mui/material';

const taya = {
  textDark:   '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue:   '#e0f2f1',
  bgCream:    '#f9f7f2',
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: taya.bgCream,
    '& fieldset':             { borderColor: '#eee' },
    '&:hover fieldset':       { borderColor: '#ccc' },
    '&.Mui-focused fieldset': { borderColor: taya.accentBlue },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: taya.accentBlue },
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData]   = useState({ email: '', password: '' });
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      const { token, user } = response.data;
      login(user, token);
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: taya.bgCream,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        }}
      >
     
        <Box
          sx={{
            bgcolor: taya.textDark,
            px: 5,
            py: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: 300,
              letterSpacing: '3px',
              mb: 0.5,
            }}
          >
            TAYA BOOKS
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '0.85rem' }}>
          Welcome Back
          </Typography>
        </Box>

   
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: 'white',
            px: 5,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{ borderRadius: '10px', fontSize: '0.85rem' }}
            >
              {error}
            </Alert>
          )}

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
            label="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            sx={inputStyle}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: taya.textDark,
              color: 'white',
              borderRadius: '50px',
              fontWeight: 400,
              fontSize: '0.95rem',
              textTransform: 'none',
              letterSpacing: 1,
              '&:hover': { bgcolor: '#333', transform: 'translateY(-2px)' },
              '&:disabled': { bgcolor: '#ccc' },
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading
              ? <CircularProgress size={24} sx={{ color: 'white' }} />
              : 'Login'}
          </Button>

        
          <Typography
            textAlign="center"
            sx={{ color: '#888', fontSize: '0.85rem', mt: 1 }}
          >
           Don't you have an account?{' '}
            <Box
              component={Link}
              to="/register"
              sx={{
                color: taya.textDark,
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: taya.accentBlue },
                transition: 'color 0.2s',
              }}
            >
             Register now
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;