
import { useState, useEffect, useRef } from 'react';
import {
  Box, Button, TextField, Typography,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogContent,
  DialogActions, Alert, CircularProgress,
  Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/CloudUpload';
import Layout from '../../components/Layout';
import axiosInstance from '../../utils/axiosInstance';

const taya = {
  textDark: '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue: '#e0f2f1',
  bgCream: '#f9f7f2',
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: taya.bgCream,
    '& fieldset': { borderColor: '#eee' },
    '&:hover fieldset': { borderColor: '#ccc' },
    '&.Mui-focused fieldset': { borderColor: taya.accentBlue },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: taya.accentBlue },
};

const emptyForm = { title: '', author: '', description: '', image: '', price: '' };

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get('/books');
      setBooks(res.data);
    } catch {
      setError('Books failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleOpenAdd = () => {
    setEditingBook(null);
    setFormData(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setDialogOpen(true);
  };

  const handleOpenEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description || '',
      image: book.image || '',
      price: book.price || ''
    });
    setImageFile(null);
    setImagePreview(book.image || '');
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingBook(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('image', imageFile);
      const res = await axiosInstance.post('/upload', data);
      return res.data.imageUrl;
    } catch {
      throw new Error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.author) {
      setError('Title and author required');
      return;
    }
     if (Number(formData.price) < 1) {
    setError('The price must be greater than or equal to 1.');
    return;
  }
    setSaving(true);
    setError('');
    try {
      const imageUrl = await uploadImage();
      const bookData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        price: formData.price,
        image: imageUrl
      };
      if (editingBook) {
        await axiosInstance.put(`/books/${editingBook._id}`, bookData);
      } else {
        await axiosInstance.post('/books', bookData);
      }
      handleClose();
      fetchBooks();
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure about deleting it?')) return;
    try {
      await axiosInstance.delete(`/books/${id}`);
      setBooks(books.filter(b => b._id !== id));
    } catch {
      setError('Deletion failed');
    }
  };

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh', bgcolor: taya.bgCream, px: '5%', py: '50px' }}>


        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            sx={{ fontSize: '1.8rem', fontWeight: 300, color: taya.textDark, letterSpacing: 1 }}
          >
           Books Management
          </Typography>

          <Button
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
            sx={{
              bgcolor: taya.textDark,
              color: 'white',
              borderRadius: '50px',
              px: 3,
              py: 1,
              fontWeight: 400,
              textTransform: 'none',
              '&:hover': { bgcolor: '#333', transform: 'translateY(-2px)' },
              transition: 'all 0.3s ease',
            }}
          >
          Add Book
          </Button>
        </Box>

  
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
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
            sx={{ borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: taya.textDark }}>
                  {['Image', 'Title', 'Author', 'Price', 'Procedures'].map((col, i) => (
                    <TableCell
                      key={col}
                      align={i === 4 ? 'center' : 'left'}
                      sx={{
                        color: '#888', fontWeight: 400, fontSize: '0.85rem',
                        letterSpacing: 1, borderBottom: '1px solid #2a2a2a'
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {books.map((book, idx) => (
                  <TableRow
                    key={book._id}
                    sx={{
                      bgcolor: idx % 2 === 0 ? 'white' : taya.bgCream,
                      '&:hover': { bgcolor: taya.softBlue },
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <TableCell>
                      <Avatar
                        src={book.image}
                        variant="rounded"
                        sx={{ width: 48, height: 48, bgcolor: taya.softBlue, borderRadius: '10px' }}
                      >
                        📚
                      </Avatar>
                    </TableCell>

                    <TableCell sx={{ color: taya.textDark, fontWeight: 500 }}>
                      {book.title}
                    </TableCell>

                    <TableCell sx={{ color: '#666', fontSize: '0.9rem' }}>
                      {book.author}
                    </TableCell>

                    <TableCell>
                      {book.price ? (
                        <Box
                          component="span"
                          sx={{
                            bgcolor: taya.softBlue,
                            color: taya.textDark,
                            px: 1.5, py: 0.4,
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          ${book.price}
                        </Box>
                      ) : '—'}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenEdit(book)}
                        sx={{
                          color: taya.accentBlue,
                          '&:hover': { bgcolor: taya.softBlue, transform: 'scale(1.1)' },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(book._id)}
                        sx={{
                          color: '#e57373',
                          '&:hover': { bgcolor: '#fff0f0', transform: 'scale(1.1)' },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* ── Dialog ── */}
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '20px',
              bgcolor: 'white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }
          }}
        >
    
          <DialogTitle
            sx={{
              bgcolor: taya.textDark,
              color: 'white',
              fontWeight: 300,
              letterSpacing: 1,
              fontSize: '1.2rem',
              borderRadius: '20px 20px 0 0',
            }}
          >
            {editingBook ? 'Book Edit' : 'Add New Book'}
          </DialogTitle>

          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '24px !important', bgcolor: 'white' }}
          >
        
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                p: 2,
                bgcolor: taya.bgCream,
                borderRadius: '12px',
              }}
            >
              <Avatar
                src={imagePreview}
                variant="rounded"
                sx={{ width: 72, height: 72, bgcolor: taya.softBlue, borderRadius: '10px', fontSize: '1.8rem' }}
              >
                📚
              </Avatar>

              <Box>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Button
                  startIcon={<UploadIcon />}
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    bgcolor: taya.textDark,
                    color: 'white',
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 400,
                    px: 2.5,
                    '&:hover': { bgcolor: '#333' },
                  }}
                >
                  {imageFile ? 'Edit Image' : 'Upload Image'}
                </Button>
                {imageFile && (
                  <Typography variant="caption" display="block" mt={0.8} sx={{ color: '#888' }}>
                    {imageFile.name}
                  </Typography>
                )}
              </Box>
            </Box>

            <TextField label="Title *" value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required fullWidth sx={inputStyle} />

            <TextField label="The author*" value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              required fullWidth sx={inputStyle} />

            <TextField label="Description" value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              fullWidth multiline rows={3} sx={inputStyle} />

            <TextField
              label="Price"
              value={formData.price}
              onChange={e => {
                const value = Number(e.target.value);

                setFormData({
                  ...formData,
                  price: e.target.value
                });

           
                if (value >= 1) {
                  setError('');
                }
              }}
              fullWidth
              type="number"
              sx={inputStyle}
              error={formData.price !== '' && Number(formData.price) < 1}
              helperText={
                formData.price !== '' && Number(formData.price) < 1
                  ? 'The price must be greater than or equal to 1.'
                  : ''
              }
              inputProps={{ min: 1 }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={handleClose}
              sx={{
                color: '#888',
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': { color: taya.textDark },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || uploading}
              sx={{
                bgcolor: taya.textDark,
                color: 'white',
                borderRadius: '50px',
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { bgcolor: '#333' },
                '&:disabled': { bgcolor: '#ccc' },
              }}
            >
              {(saving || uploading)
                ? <CircularProgress size={20} sx={{ color: 'white' }} />
                : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Layout>
  );
};

export default ManageBooks;