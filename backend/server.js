const express=require('express');
const path = require("path");

const cors=require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();


const app=express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//routes
app.use('/api/auth',  require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/books', require('./routes/book.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/upload', require('./routes/upload.routes'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});