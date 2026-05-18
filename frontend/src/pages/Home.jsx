
import { useState, useEffect } from 'react';
import {
  Card, CardMedia, CardContent,
  Typography, Box, CircularProgress,
  Alert, Chip, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment
} from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; // تأكد من وجود حزمة @mui/icons-material
import Layout from '../components/Layout';
import axiosInstance from '../utils/axiosInstance';

const theme = {
  bgCream:    '#f9f7f2',
  textDark:   '#1a1a1a',
  accentBlue: '#a8dadc',
  softBlue:   '#e0f2f1',
};

const Home = () => {
  const [books, setBooks]         = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // مصفوفة الكتب المفلترة
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        setBooks(response.data);
        setFilteredBooks(response.data); 
      } catch (err) {
        setError('Books failed to load, please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let result = books;

  
    if (searchQuery) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

   
    if (priceFilter !== 'all') {
      if (priceFilter === 'free') {
        result = result.filter(book => !book.price || book.price === 0);
      } else if (priceFilter === 'under20') {
        result = result.filter(book => book.price && book.price < 20);
      } else if (priceFilter === 'over20') {
        result = result.filter(book => book.price && book.price >= 20);
      }
    }

    setFilteredBooks(result);
  }, [searchQuery, priceFilter, books]);

  return (
    <Layout>


      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: '10%',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)),
            url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2070')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 300, fontSize: '4rem', mb: 2, maxWidth: 600 }}
        >
          Own your knowledge.
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 300, opacity: 0.9, mb: 4 }}
        >
          Discover timeless books crafted for every curious mind. <br />
          Simple. Elegant. Inspiring.
        </Typography>

        <Box
          component="a"
          href="#books"
          sx={{
            px: '30px', py: '12px',
            bgcolor: 'white',
            color: theme.textDark,
            borderRadius: '50px',
            fontWeight: 500,
            textDecoration: 'none',
            border: '1px solid transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'transparent',
              color: 'white',
              borderColor: 'white',
            },
          }}
        >
          Browse Books
        </Box>
      </Box>


      <Box
        sx={{
          textAlign: 'center',
          py: '100px',
          px: 2,
          bgcolor: 'white',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 400, color: '#2c3e50' }}
        >
          The reading revolution is now. <br />
          Meet <strong>Taya Books</strong>.
        </Typography>
      </Box>

  
      <Box
        id="books"
        sx={{ px: '10%', py: '60px', bgcolor: theme.bgCream }}
      >
        
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2, 
            mb: 5, 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 300, color: theme.textDark, letterSpacing: 1, alignSelf: 'flex-start' }}
          >
            Available books
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
           
            <TextField
              placeholder="Search by title or author..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#888' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: '50px',
                width: { xs: '100%', sm: '250px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  '&:hover fieldset': { borderColor: theme.accentBlue },
                }
              }}
            />

           
            <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white', borderRadius: '50px' }}>
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                displayEmpty
                sx={{ 
                  borderRadius: '50px',
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.accentBlue }
                }}
              >
                <MenuItem value="all">All Prices</MenuItem>
                <MenuItem value="under20">Under $20</MenuItem>
                <MenuItem value="over20">$20 & Above</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: theme.accentBlue }} />
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: '12px', bgcolor: '#fff0f0' }}
          >
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
            {filteredBooks.length === 0 ? (
              <Typography
                color="text.secondary"
                textAlign="center"
                py={4}
                sx={{ fontWeight: 300 }}
              >
                No books match your search or filter criteria.
              </Typography>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '24px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {filteredBooks.map((book) => (
                  <Box
                    key={book._id}
                    sx={{
                      width: {
                        xs: '100%',                                    
                        sm: 'calc(50% - 12px)',                  
                        md: 'calc(33.333% - 16px)'               
                      },
                      boxSizing: 'border-box',
                      display: 'flex',
                      minWidth: 0 
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        height: 460, 
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "15px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        overflow: "hidden", 
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={book.image || ""}
                        alt={book.title}
                        sx={{
                          height: 200, 
                          width: "100%",
                          objectFit: "cover",
                          bgcolor: theme.softBlue,
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />

                      <CardContent
                        sx={{
                          flexGrow: 1, 
                          display: "flex",
                          flexDirection: "column",
                          p: 3,
                          minWidth: 0, 
                          overflow: "hidden" 
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 500,
                            color: theme.textDark,
                            mb: 1,
                            lineHeight: 1.3,
                            height: 52, 
                            whiteSpace: "normal",
                            wordBreak: "break-word", 
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {book.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#888",
                            mb: 1.5,
                            height: 20,
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {book.author}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            lineHeight: 1.5,
                            flexGrow: 1, 
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, 
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {book.description}
                        </Typography>

                        <Box sx={{ mt: "auto", pt: 1 }}>
                          {book.price && (
                            <Chip
                              label={`$${book.price}`}
                              size="small"
                              sx={{
                                bgcolor: theme.softBlue,
                                color: theme.textDark,
                                fontWeight: 500,
                                borderRadius: "50px",
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

    </Layout>
  );
};

export default Home;